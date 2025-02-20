import { Student } from "./student";

export class Table {
    private student: Array<Student> = [];
    private amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    public addStudent(student: Student): void {
        if (this.student.length === this.amount) {
            throw new Error("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
        }
        this.student.push(student);
    }

    public removeStudent(): Student {
        if (!this.student) {
            throw new Error("Não é possível remover estudantes de uma mesa que está vazia.");
        }
        return this.student.shift()!;
    }

    public checkIfTableIsOccupied(): boolean {
        return this.student.length === this.amount;
    }
}