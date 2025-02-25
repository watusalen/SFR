import { Student } from "./student";

export class Table {
    private students: Array<Student>;
    private tableLimit: number;

    constructor(tableLimit: number) {
        this.tableLimit = tableLimit;
        this.students = [];
    }

    public addStudent(student: Student): void {
        if (this.students.length == this.tableLimit) {
            throw new Error("Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas.");
        }
        this.students.push(student);
    }

    public removeStudent(student: Student): void {
        const initialLength = this.students.length;
        this.students = this.students.filter(s => s !== student);
        if (this.students.length === initialLength) {
            throw new Error("O estudante não existe.");
        }    
    }

    public getTableLimit(): number {
        if (!this.tableLimit) {
            throw new Error("O limite de mesas ainda não foi definido.");
        }
        return this.tableLimit;
    }

    public checkManyStudentsAreInTable(): number {
        return this.students.length;
    }
}