import { InternalQueue } from "@/domain/simulation-engine/system/internal-queue";
import { Student } from "@/domain/simulation-engine/system/student";

describe('InternalQueue', () => {
    let internalQueue: InternalQueue;
    let student: Student;

    beforeEach(() => {
        internalQueue = new InternalQueue(2); // Limite de 2 estudantes
        student = new Student(1000, 2000, 3000);
    });

    // Testes para addStudent
    describe('addStudent', () => {
        it('should add a student to the internal queue', () => {
            internalQueue.addStudent(student);
            expect(internalQueue.checkSizeOfQueue()).toBe(1);
        });

        it('should throw an error if the internal queue is full', () => {
            internalQueue.addStudent(student);
            internalQueue.addStudent(student);
            expect(() => internalQueue.addStudent(student)).toThrow("Não é possível adicionar um estudante a uma fila interna que já está cheia.");
        });
    });

    // Testes para removeStudent
    describe('removeStudent', () => {
        it('should remove a student from the internal queue', () => {
            internalQueue.addStudent(student);
            const removedStudent = internalQueue.removeStudent();
            expect(removedStudent).toBe(student);
            expect(internalQueue.checkSizeOfQueue()).toBe(0);
        });

        it('should throw an error if the internal queue is empty', () => {
            expect(() => internalQueue.removeStudent()).toThrow("Não é possível remover estudantes de uma fila que está vazia.");
        });
    });

    // Testes para checkInternalQueueLimitRecheadMaximum
    describe('checkInternalQueueLimitRecheadMaximum', () => {
        it('should return true if the internal queue limit is reached', () => {
            internalQueue.addStudent(student);
            internalQueue.addStudent(student);
            expect(internalQueue.checkInternalQueueLimitRecheadMaximum()).toBe(true);
        });

        it('should return false if the internal queue limit is not reached', () => {
            internalQueue.addStudent(student);
            expect(internalQueue.checkInternalQueueLimitRecheadMaximum()).toBe(false);
        });
    });

    // Testes para checkSizeOfQueue
    describe('checkSizeOfQueue', () => {
        it('should return the size of the internal queue', () => {
            internalQueue.addStudent(student);
            expect(internalQueue.checkSizeOfQueue()).toBe(1);
        });
    });

    // Testes para getInternalQueueLimit
    describe('getInternalQueueLimit', () => {
        it('should return the internal queue limit', () => {
            expect(internalQueue.getInternalQueueLimit()).toBe(2);
        });
    });
});