import { ExternalQueue } from '@/domain/simulation-engine/system/external-queue';
import { Student } from '@/domain/simulation-engine/system/student';

describe('ExternalQueue', () => {
    let externalQueue: ExternalQueue;
    let student: Student;

    beforeEach(() => {
        externalQueue = new ExternalQueue();
        student = new Student(1000, 2000, 3000);
    });

    // Testes para addStudent
    describe('addStudent', () => {
        it('should add a student to the external queue', () => {
            externalQueue.addStudent(student);
            expect(externalQueue.getStudent()).toBe(1);
        });
    });

    // Testes para removeStudent
    describe('removeStudent', () => {
        it('should remove a student from the external queue', () => {
            externalQueue.addStudent(student);
            const removedStudent = externalQueue.removeStudent();
            expect(removedStudent).toBe(student);
            expect(externalQueue.getStudent()).toBe(0);
        });

        it('should throw an error if the external queue is empty', () => {
            expect(() => externalQueue.removeStudent()).toThrow("Não é possível remover estudantes de uma fila que está vazia.");
        });
    });

    // Testes para getStudent
    describe('getStudent', () => {
        it('should return the number of students in the external queue', () => {
            externalQueue.addStudent(student);
            expect(externalQueue.getStudent()).toBe(1);
        });
    });
});