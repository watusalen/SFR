import { Student } from "./student";

export class InternalQueue {
    private students: Array<Student>;
    private limit: number;

    constructor(limit: number) {
        this.students = [];
        this.limit = limit;
    }

    public addStudent(student: Student): void {
        if (this.students.length === this.limit) {
            throw new Error("Não é possível adicionar estudantes a uma fila que está cheia.");
        }
        this.students.push(student);
    }

    public removeStudent(): Student {
        if (this.students.length === 0) {
            throw new Error("Não é possível remover estudantes de uma fila que está vazia.");
        }
        return this.students.shift()!;
    }

    public checkLimit(): boolean {
        return this.students.length === this.limit;
    }

    public checkSizeOfQueue(): number {
        return this.students.length;
    }
}