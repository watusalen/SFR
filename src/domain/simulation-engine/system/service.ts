import { Student } from "./student";

export class Service {
    private locked: boolean;
    private student: Student | undefined;

    constructor() {
        this.locked = false;
    }

    public addStudent(student: Student): void {
        if (this.student) {
            throw new Error("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        }
        this.student = student;
    }

    public removeStudent(): Student {
        if (!this.student) {
            throw new Error("Não é possível remover um estudante de um serviço que está vazio.");
        }
        const student = this.student;
        this.student = undefined;
        return student;
    }

    public lock(): void {
        this.locked = true;
    }

    public unlock(): void {
        this.locked = false;
    }

    public hasSomeone(): boolean {
        if (this.student) {
            return true;
        }
        return false;
    }

    public getLocked(): boolean {
        return this.locked;
    }
}