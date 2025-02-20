import { Student } from "./student";

export class Turnstile {
    private locked: boolean;
    private student: Student | undefined;
    private studentsToReleaseTurnstile: number;

    constructor() {
        this.locked = false;
    }

    public addStudent(student: Student): void {
        if (this.student) {
            throw new Error("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        }
        this.student = student;
    }

    public removeStudent(): Student {
        if (!this.student) {
            throw new Error("Não é possível remover um estudante de uma catraca que está vazia.");
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
        if(this.student){
            return true;
        }
        return false;
    }
}