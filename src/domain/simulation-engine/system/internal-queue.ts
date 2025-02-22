import { Student } from "./student";

export class InternalQueue {
    private students: Array<Student>;
    private internalQueueLimit: number;

    constructor(internalQueueLimit: number) {
        this.students = [];
        this.internalQueueLimit = internalQueueLimit;
    }

    public addStudent(student: Student): void {
        if (this.students.length === this.internalQueueLimit) {
            throw new Error("Não é possível adicionar um estudante a uma fila interna que já está cheia.");
        }
        this.students.push(student);
    }

    public getInternalQueueLimit(): number {
        return this.internalQueueLimit;
    }

    public removeStudent(): Student {
        if (this.students.length === 0) {
            throw new Error("Não é possível remover estudantes de uma fila que está vazia.");
        }
        return this.students.shift()!;
    }  

    public checkInternalQueueLimitRecheadMaximum(): boolean {
        return this.students.length === this.internalQueueLimit;
    }
    
    public checkSizeOfQueue(): number {
        return this.students.length;
    }
}