import { Student } from "./student";

export class Table {
    private student: Array<Student> = [];
    private tableLimit: number;

    constructor(tableLimit: number) {
        this.tableLimit = tableLimit;
    }

    public addStudent(student: Student): void {
        if (this.student.length === this.tableLimit) {
            throw new Error("Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas.");
        }
        this.student.push(student);
    }

    public removeStudent(): Student {
        if (this.student.length === 0) {
            throw new Error("Não é possível remover estudantes de uma mesa que está vazia.");
        }
        return this.student.shift()!;
    }

    public checkIfAllTableIsOccupied(): boolean {
        return this.student.length === this.tableLimit;
    }

    public getTableLimit(): number {
        return this.tableLimit;
    }

    public checkManyStudentsAreInTable(): number {
        return this.student.length;
    }
}