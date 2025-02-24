import { Service } from '@/domain/simulation-engine/system/service';
import { Student } from '@/domain/simulation-engine/system/student';

describe('Service', () => {
    let service: Service;
    let student: Student;

    beforeEach(() => {
        service = new Service();
        student = new Student(10, 2); // registrationTime = 10, tableTime = 2
    });

    it('should add a student to the service', () => {
        service.addStudent(student);
        expect(service.hasSomeone()).toBe(true);
    });

    it('should throw an error when adding a student to an occupied service', () => {
        service.addStudent(student);
        expect(() => service.addStudent(student)).toThrow("Não é possível adicionar um estudante a um serviço que já está ocupado.");
    });

    it('should remove a student from the service', () => {
        service.addStudent(student);
        const removedStudent = service.removeStudent();
        expect(removedStudent).toBe(student);
        expect(service.hasSomeone()).toBe(false);
    });

    it('should throw an error when removing a student from an empty service', () => {
        expect(() => service.removeStudent()).toThrow("Não é possível remover um estudante de um serviço que está vazio.");
    });

    it('should lock the service', () => {
        service.lock();
        expect(service.getLocked()).toBe(true);
    });

    it('should unlock the service', () => {
        service.lock();
        service.unlock();
        expect(service.getLocked()).toBe(false);
    });

    it('should check if someone is in the service', () => {
        expect(service.hasSomeone()).toBe(false);
        service.addStudent(student);
        expect(service.hasSomeone()).toBe(true);
    });
});