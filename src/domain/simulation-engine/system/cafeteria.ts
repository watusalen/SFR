import { Table } from "./table";
import { InternalQueue } from "./internal-queue";
import { ExternalQueue } from "./external-queue";
import { Turnstile } from "./turnstile";
import { Service } from "./service";
import { Student } from "./student";

export class Cafeteria {
    private table: Table;
    private internalQueue: InternalQueue;
    private externalQueue: ExternalQueue;
    private turnstile: Turnstile;
    private service: Service;

    constructor(internalQueueLimit: number, turnstileLimit: number, amount: number) {
        this.internalQueue = new InternalQueue(internalQueueLimit);
        this.turnstile = new Turnstile(turnstileLimit);
        this.externalQueue = new ExternalQueue();
        this.service = new Service();
        this.table = new Table(amount);
    }

    public addStudentToExternalQueue(student: Student): boolean {
        this.externalQueue.addStudent(student);
        return true;
    }

    public moveStudentFromExternalQueueToTurnstile(): number {
        if (this.turnstile.hasSomeone()) {
            throw new Error("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        }
        if (this.turnstile.getLocked()) {
            throw new Error("Não é possível adicionar um estudante a uma catraca que está trancada.");
        }
        const student: Student = this.externalQueue.removeStudent();
        this.turnstile.addStudent(student);
        return student.getRegistrationTime();
    }

    public moveStudentFromTurnstileToInternalQueue(): boolean {
        const student: Student = this.turnstile.removeStudent();
        this.internalQueue.addStudent(student);
        return true;
    }

    public moveStudentFromInternalQueueToService(): boolean {
        if (this.service.hasSomeone()) {
            throw new Error("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        }
        if (this.table.checkIfAllTableIsOccupied()) {
            throw new Error("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
        }
        const student: Student = this.internalQueue.removeStudent();
        this.service.addStudent(student);
        return true;
    }

    public moveStudentFromServiceToTable(): number {
        if (!this.service.hasSomeone()) {
            throw new Error("Não há estudantes no serviço para mover para a mesa.");
        }
        if (this.table.checkIfAllTableIsOccupied()) {
            throw new Error("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
        }
        const student: Student = this.service.removeStudent();
        const timeStenpInTable : number = student.getTableTime();
        this.table.addStudent(student);
        return timeStenpInTable;
    }

    public timeStenpInService(): number {
        return this.service.timeStenpInService();
    }

    public removeStudentFromCafeteria(): Student {
        return this.table.removeStudent();
    }

    public hasSomeoneInService(): boolean {
        if (this.service.hasSomeone()) {
            return true;
        }
        return false;
    }

    public serviceLockBecauseHasSomeone(): boolean {
        if (this.hasSomeoneInService()) {
            this.lockTheService();
            return true;
        }
    }

    public checkServiceLocked(): boolean {
        return this.service.getLocked();
    }

    public lockTheService(): boolean {
        this.service.lock();
        return true;
    }

    public unlockTheService(): boolean {
        this.service.unlock();
        return true;
    }

    public checkAllTablesAreOccupied(): boolean {
        return this.table.checkIfAllTableIsOccupied();
    }

    public hasTableAvaliable(): boolean {
        if (this.checkAllTablesAreOccupied()) {
            return false;
        }
        return true;
    }

    public serviceLockBecauseTableIsFull(): boolean {
        if (!this.hasTableAvaliable()) {
            this.lockTheService();
            return true;
        }
    }

    public serviceUnlockBecauseTableGotEmpty(): boolean {
        if (this.hasTableAvaliable()) {
            this.unlockTheService();
            return true;
        }
    }

    public hasSomeoneInTurnstile(): boolean {
        if (this.turnstile.hasSomeone()) {
            return true;
        }
        return false;
    }

    public checkTurnstileLocked(): boolean {
        return this.turnstile.getLocked();
    }

    public lockTheTurnstile(): boolean {
        this.turnstile.lock();
        return true;
    }

    public unlockTheTurnstile(): boolean {
        this.turnstile.unlock();
        return true;
    }

    public turnstileLockBecauseHasSomeone(): boolean {
        if (this.hasSomeoneInTurnstile()) {
            this.lockTheTurnstile();
            return true;
        }
    }

    public turnstileUnlockBecauseHasNoOne(): boolean {
        if (!this.hasSomeoneInTurnstile()) {
            this.unlockTheTurnstile();
            return true;
        }
    }

    public turnstileUnlockBecauseTheQueueGotShorter(): boolean {
        if (this.checkInternalQueueGotShorter()) {
            this.unlockTheTurnstile();
            return true;
        }
    }

    public turnstileLockBecauseQueueIsFull(): boolean {
        if (this.checkInternalQueueLimitRecheadMaximum()) {
            this.lockTheTurnstile();
            return true;
        }
    }

    public checkInternalQueueSize(): number {
        return this.internalQueue.checkSizeOfQueue();
    }

    public checkInternalQueueGotShorter(): boolean {
        if (this.checkInternalQueueSize() === (this.internalQueue.getInternalQueueLimit() - this.turnstile.getTurnstileLimit())) {
            return true;
        }
        return false;
    }

    public checkInternalQueueLimitRecheadMaximum(): boolean {
        return this.internalQueue.checkInternalQueueLimitRecheadMaximum();
    }

    public checkStudentsInTable(): number {
        return this.table.checkManyStudentsAreInTable();
    }

    public getStudents(): number {
        return this.externalQueue.getStudent();
    }
}