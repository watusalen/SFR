import { Turnstile } from "@/domain/simulation-engine/system/turnstile";
import { Student } from "@/domain/simulation-engine/system/student";

describe('Turnstile', () => {
    let turnstile: Turnstile;
    let student: Student;

    beforeEach(() => {
        turnstile = new Turnstile(1); // Limite de 1 estudante por vez
        student = new Student(10, 2); // registrationTime = 10, tableTime = 2
    });

    it('should add a student to the turnstile', () => {
        turnstile.addStudent(student);
        expect(turnstile.hasSomeone()).toBe(true);
    });

    it('should throw an error when adding a student to an occupied turnstile', () => {
        turnstile.addStudent(student);
        expect(() => turnstile.addStudent(student)).toThrow("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
    });

    it('should remove a student from the turnstile', () => {
        turnstile.addStudent(student);
        const removedStudent = turnstile.removeStudent();
        expect(removedStudent).toBe(student);
        expect(turnstile.hasSomeone()).toBe(false);
    });

    it('should throw an error when removing a student from an empty turnstile', () => {
        expect(() => turnstile.removeStudent()).toThrow("Não é possível remover um estudante de uma catraca que está vazia.");
    });

    it('should lock the turnstile', () => {
        turnstile.lock();
        expect(turnstile.getLocked()).toBe(true);
    });

    it('should unlock the turnstile', () => {
        turnstile.lock();
        turnstile.unlock();
        expect(turnstile.getLocked()).toBe(false);
    });

    it('should check if someone is in the turnstile', () => {
        expect(turnstile.hasSomeone()).toBe(false);
        turnstile.addStudent(student);
        expect(turnstile.hasSomeone()).toBe(true);
    });

    it('should get the turnstile limit', () => {
        expect(turnstile.getTurnstileLimit()).toBe(1);
    });
});