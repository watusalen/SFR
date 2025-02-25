import { Service } from '@/domain/simulation-engine/system/service';
import { Student } from '@/domain/simulation-engine/system/student';

describe('Service', () => {
    let service: Service;
    let student: Student;

    beforeEach(() => {
        service = new Service();
        student = new Student(1000, 2000, 3000);
    });

    // Testes para addStudent
    describe('addStudent', () => {
        it('should add a student to the service', () => {
            service.addStudent(student);
            expect(service.hasSomeone()).toBe(true);
        });

        it('should throw an error if the service is already occupied', () => {
            service.addStudent(student);
            expect(() => service.addStudent(student)).toThrow("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        });
    });

    // Testes para removeStudent
    describe('removeStudent', () => {
        it('should remove a student from the service', () => {
            service.addStudent(student);
            const removedStudent = service.removeStudent();
            expect(removedStudent).toBe(student);
            expect(service.hasSomeone()).toBe(false);
        });

        it('should throw an error if the service is empty', () => {
            expect(() => service.removeStudent()).toThrow("Não é possível remover um estudante de um serviço que está vazio.");
        });
    });

    // Testes para lock e unlock
    describe('lock and unlock', () => {
        it('should lock the service', () => {
            service.lock();
            expect(service.getLocked()).toBe(true);
        });

        it('should unlock the service', () => {
            service.lock();
            service.unlock();
            expect(service.getLocked()).toBe(false);
        });

        it('should throw an error if trying to lock an already locked service', () => {
            service.lock();
            expect(() => service.lock()).toThrow("Não é possível trancar um atendimento que já está trancado.");
        });

        it('should throw an error if trying to unlock an already unlocked service', () => {
            expect(() => service.unlock()).toThrow("Não é possível destrancar um atendimento que já está destrancado.");
        });
    });

    // Testes para hasSomeone
    describe('hasSomeone', () => {
        it('should return true if someone is in the service', () => {
            service.addStudent(student);
            expect(service.hasSomeone()).toBe(true);
        });

        it('should return false if no one is in the service', () => {
            expect(service.hasSomeone()).toBe(false);
        });
    });

    // Testes para getLocked
    describe('getLocked', () => {
        it('should return true if the service is locked', () => {
            service.lock();
            expect(service.getLocked()).toBe(true);
        });

        it('should return false if the service is unlocked', () => {
            expect(service.getLocked()).toBe(false);
        });
    });

    // Testes para timeStenpInService
    describe('timeStenpInService', () => {
        it('should return the attended time of the student in service', () => {
            service.addStudent(student);
            expect(service.timeStenpInService()).toBe(student.getAttendedTime());
        });
    });
});