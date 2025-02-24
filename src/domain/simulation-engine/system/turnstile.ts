import { Student } from "./student";

export class Turnstile {
    private locked: boolean;
    private student: Student | undefined;
    private turnstileLimit: number;

    constructor(turnstileLimit: number) {
        this.turnstileLimit = turnstileLimit;
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
        const student: Student | undefined = this.student;
        this.student = undefined;
        return student;
    }

    public lock(): void {
        if (this.locked === true) {
            throw new Error("Não é possível trancar uma catraca que já está trancada.");
        }
        this.locked = true;
    }

    public unlock(): void {
        if (this.locked === false) {
            throw new Error("Não é possível destrancar uma catraca que já está destrancada.");
        }
        this.locked = false;
    }

    public hasSomeone(): boolean {
        if (this.student) {
            return true;
        }
        return false;
    }

    public getTurnstileLimit(): number {
        if (!this.turnstileLimit) {
            throw new Error("O limite de pessoas para liberar a catraca ainda não foi definido.");
        }
        return this.turnstileLimit;
    }

    public getLocked(): boolean {
        return this.locked;
    }
}