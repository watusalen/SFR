import { Turnstile } from "@/domain/simulation-engine/system/turnstile";
import { Student } from "@/domain/simulation-engine/system/student";

describe('Turnstile', () => {
    let turnstile: Turnstile;
    let student: Student;

    beforeEach(() => {
        turnstile = new Turnstile(1); // Limite de 1 estudante
        student = new Student(1000, 2000, 3000);
    });

    // Testes para addStudent
    describe('addStudent', () => {
        it('should add a student to the turnstile', () => {
            turnstile.addStudent(student);
            expect(turnstile.hasSomeone()).toBe(true);
        });

        it('should throw an error if the turnstile is already occupied', () => {
            turnstile.addStudent(student);
            expect(() => turnstile.addStudent(student)).toThrow("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        });
    });

    it('should throw an error if turnstile limit is not defined', () => {
        const invalidTurnstile = new Turnstile(undefined as any); // Forçando um valor inválido
        expect(() => invalidTurnstile.getTurnstileLimit()).toThrow("O limite de pessoas para liberar a catraca ainda não foi definido.");
    });

    // Testes para removeStudent
    describe('removeStudent', () => {
        it('should remove a student from the turnstile', () => {
            turnstile.addStudent(student);
            const removedStudent = turnstile.removeStudent();
            expect(removedStudent).toBe(student);
            expect(turnstile.hasSomeone()).toBe(false);
        });

        it('should throw an error if the turnstile is empty', () => {
            expect(() => turnstile.removeStudent()).toThrow("Não é possível remover um estudante de uma catraca que está vazia.");
        });
    });

    // Testes para lock e unlock
    describe('lock and unlock', () => {
        it('should lock the turnstile', () => {
            turnstile.lock();
            expect(turnstile.getLocked()).toBe(true);
        });

        it('should unlock the turnstile', () => {
            turnstile.lock();
            turnstile.unlock();
            expect(turnstile.getLocked()).toBe(false);
        });

        it('should throw an error if trying to lock an already locked turnstile', () => {
            turnstile.lock();
            expect(() => turnstile.lock()).toThrow("Não é possível trancar uma catraca que já está trancada.");
        });

        it('should throw an error if trying to unlock an already unlocked turnstile', () => {
            expect(() => turnstile.unlock()).toThrow("Não é possível destrancar uma catraca que já está destrancada.");
        });
    });

    // Testes para hasSomeone
    describe('hasSomeone', () => {
        it('should return true if someone is in the turnstile', () => {
            turnstile.addStudent(student);
            expect(turnstile.hasSomeone()).toBe(true);
        });

        it('should return false if no one is in the turnstile', () => {
            expect(turnstile.hasSomeone()).toBe(false);
        });
    });

    // Testes para getTurnstileLimit
    describe('getTurnstileLimit', () => {
        it('should return the turnstile limit', () => {
            expect(turnstile.getTurnstileLimit()).toBe(1);
        });
    });

    // Testes para getLocked
    describe('getLocked', () => {
        it('should return true if the turnstile is locked', () => {
            turnstile.lock();
            expect(turnstile.getLocked()).toBe(true);
        });

        it('should return false if the turnstile is unlocked', () => {
            expect(turnstile.getLocked()).toBe(false);
        });
    });
});