import { Student } from "./student";

export class ExternalQueue {
    private students: Array<Student>;

    constructor() {
        this.students = [];
    }

    public addStudent(student: Student): void {
        this.students.push(student);
    }

    public removeStudent(): Student {
        if (this.students.length === 0) {
            throw new Error("Não é possível remover estudantes de uma fila que está vazia.");
        }
        return this.students.shift()!;
    }

    public getStudent():number{
        return this.students.length;
    }
}