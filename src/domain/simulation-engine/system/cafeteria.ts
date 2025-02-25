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
        if (this.hasSomeoneInTurnstile()) {
            throw new Error("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        }
        if (this.checkTurnstileLocked()) {
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
        if (this.hasSomeoneInService()) {
            throw new Error("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        }
        if (!this.hasTableAvaliable()) {
            throw new Error("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
        }
        const student: Student = this.internalQueue.removeStudent();
        this.service.addStudent(student);
        return true;
    }

    public moveStudentFromServiceToTable(): Student {
        if (!this.hasSomeoneInService()) {
            throw new Error("Não há estudantes no serviço para mover para a mesa.");
        }
        if (!this.hasTableAvaliable()) {
            throw new Error("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
        }
        const student: Student = this.service.removeStudent();
        this.table.addStudent(student);
        return student;
    }

    public timeStenpInService(): number {
        return this.service.timeStenpInService();
    }

    public removeStudentFromCafeteria(student: Student): void {
        this.table.removeStudent(student);
    }

    public hasSomeoneInService(): boolean {
        if (this.service.hasSomeone()) {
            return true;
        }
        return false;
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

    public hasTableAvaliable(): boolean {
        return this.table.checkManyStudentsAreInTable() < this.table.getTableLimit();
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

    public checkInternalQueueSize(): number {
        return this.internalQueue.checkSizeOfQueue();
    }

    public checkInternalQueueLimitRecheadMaximum(): boolean {
        return this.internalQueue.checkInternalQueueLimitRecheadMaximum();
    }

    public checkManyStudentsAreInTable(): number {
        return this.table.checkManyStudentsAreInTable();
    }

    public getSizeOfExternalQueue(): number {
        return this.externalQueue.getStudent();
    }

    public hasSomeoneInExternalQueue(): boolean {
        if (this.externalQueue.getStudent() > 0) {
            return true;
        }
        return false;
    }

    public hasSomeoneInInternalQueue(): boolean {
        if (this.internalQueue.checkSizeOfQueue() > 0) {
            return true;
        }
        return false;
    }

    public getInternalQueueLimit(): number {
        return this.internalQueue.getInternalQueueLimit();
    }

    public geturnstileLimit(): number {
        return this.turnstile.getTurnstileLimit();
    }
}