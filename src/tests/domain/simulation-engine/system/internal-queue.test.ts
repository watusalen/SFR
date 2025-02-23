import { InternalQueue } from "@/domain/simulation-engine/system/internal-queue";
import { Student } from "@/domain/simulation-engine/system/student";

describe('InternalQueue', () => {
    let internalQueue: InternalQueue;
    let student1: Student;
    let student2: Student;

    beforeEach(() => {
        internalQueue = new InternalQueue(2); // Limite de 2 estudantes na fila
        student1 = new Student(10, 2); // registrationTime = 10, tableTime = 2
        student2 = new Student(15, 3); // registrationTime = 15, tableTime = 3
    });

    it('should add a student to the queue', () => {
        internalQueue.addStudent(student1);
        expect(internalQueue.checkSizeOfQueue()).toBe(1);
    });

    it('should throw an error when adding a student to a full queue', () => {
        internalQueue.addStudent(student1);
        internalQueue.addStudent(student2);
        expect(() => internalQueue.addStudent(student1)).toThrow("Não é possível adicionar um estudante a uma fila interna que já está cheia.");
    });

    it('should remove a student from the queue', () => {
        internalQueue.addStudent(student1);
        const removedStudent = internalQueue.removeStudent();
        expect(removedStudent).toBe(student1);
        expect(internalQueue.checkSizeOfQueue()).toBe(0);
    });

    it('should throw an error when removing a student from an empty queue', () => {
        expect(() => internalQueue.removeStudent()).toThrow("Não é possível remover estudantes de uma fila que está vazia.");
    });

    it('should check if the queue limit is reached', () => {
        internalQueue.addStudent(student1);
        expect(internalQueue.checkInternalQueueLimitRecheadMaximum()).toBe(false);

        internalQueue.addStudent(student2);
        expect(internalQueue.checkInternalQueueLimitRecheadMaximum()).toBe(true);
    });

    it('should check the size of the queue', () => {
        expect(internalQueue.checkSizeOfQueue()).toBe(0);
        internalQueue.addStudent(student1);
        expect(internalQueue.checkSizeOfQueue()).toBe(1);
    });

    it('should get the internal queue limit', () => {
        expect(internalQueue.getInternalQueueLimit()).toBe(2);
    });
});