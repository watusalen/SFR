import { ExternalQueue } from "./external-queue";
import { InternalQueue } from "./internal-queue";
import { Table } from "./table";
import { Turnstile } from "./turnstile";
import { Service } from "./service";
import { Student } from "./student";

export class Cafeteria {
    private table: Table;
    private internalQueue: InternalQueue;
    private externalQueue: ExternalQueue;
    private turnstile: Turnstile;
    private service: Service;

    constructor(limit: number, averageServingTime: number, amount: number) {
        this.internalQueue = new InternalQueue(limit);
        this.turnstile = new Turnstile();
        this.externalQueue = new ExternalQueue();
        this.service = new Service(averageServingTime);
        this.table = new Table(amount);
    }

    public addStudentToExternalQueue(student: Student): void {
        this.externalQueue.addStudent(student);
    }

    public moveStudentFromExternalQueueToTurnstile(): boolean {
        const student: Student = this.externalQueue.removeStudent();
        if (this.turnstile.hasSomeone()) {
            new Error("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        }
        if (this.internalQueue.checkLimit()) {
            new Error("Não é possível adicionar um estudante a uma fila interna que já está cheia.");
        }
        this.turnstile.addStudent(student);
        return true;
    }

    public moveStudentFromTurnstileToInternalQueue(): boolean {
        const student: Student = this.turnstile.removeStudent();
        this.internalQueue.addStudent(student);
        return true;
    }

    public moveStudentFromInternalQueueToService(): boolean {
        const student: Student = this.internalQueue.removeStudent();
        if (this.service.hasSomeone()) {
            new Error("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        }
        if (this.table.checkIfTableIsOccupied()) {
            new Error("Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas.");
        }
        this.service.addStudent(student);
        return true;
    }

    public moveStudentFromServiceToTable(): boolean {
        const student: Student = this.service.removeStudent();
        this.table.addStudent(student);
        return true;
    }

    public removeStudentFromCafeteria(): Student {
        return this.table.removeStudent();
    }
}