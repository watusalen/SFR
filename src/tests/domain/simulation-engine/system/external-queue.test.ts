import { ExternalQueue } from '@/domain/simulation-engine/system/external-queue';
import { Student } from '@/domain/simulation-engine/system/student';

describe('ExternalQueue', () => {
    let externalQueue: ExternalQueue;
    let student1: Student;
    let student2: Student;

    beforeEach(() => {
        externalQueue = new ExternalQueue();
        student1 = new Student(10, 2); // registrationTime = 10, tableTime = 2
        student2 = new Student(15, 3); // registrationTime = 15, tableTime = 3
    });

    it('should add a student to the queue', () => {
        externalQueue.addStudent(student1);
        expect(externalQueue.removeStudent()).toBe(student1);
    });

    it('should remove students in FIFO order', () => {
        externalQueue.addStudent(student1);
        externalQueue.addStudent(student2);

        expect(externalQueue.removeStudent()).toBe(student1); // Primeiro a entrar, primeiro a sair
        expect(externalQueue.removeStudent()).toBe(student2); // Segundo a entrar, segundo a sair
    });

    it('should throw an error when removing a student from an empty queue', () => {
        expect(() => externalQueue.removeStudent()).toThrow("Não é possível remover estudantes de uma fila que está vazia.");
    });

    it('should handle multiple additions and removals correctly', () => {
        externalQueue.addStudent(student1);
        externalQueue.addStudent(student2);

        expect(externalQueue.removeStudent()).toBe(student1); // Remove o primeiro estudante
        externalQueue.addStudent(student1); // Adiciona outro estudante

        expect(externalQueue.removeStudent()).toBe(student2); // Remove o segundo estudante
        expect(externalQueue.removeStudent()).toBe(student1); // Remove o estudante adicionado novamente
    });
});