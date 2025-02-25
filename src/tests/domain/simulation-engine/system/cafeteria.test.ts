import { Cafeteria } from "@/domain/simulation-engine/system/cafeteria";
import { Student } from "@/domain/simulation-engine/system/student";

describe('Cafeteria', () => {
    let cafeteria: Cafeteria;
    let student: Student;

    beforeEach(() => {
        cafeteria = new Cafeteria(5, 1, 10);
        student = new Student(1000, 2000, 3000);
    });

    // Testes para addStudentToExternalQueue
    describe('addStudentToExternalQueue', () => {
        it('should add a student to the external queue', () => {
            const result = cafeteria.addStudentToExternalQueue(student);
            expect(result).toBe(true);
            expect(cafeteria.hasSomeoneInExternalQueue()).toBe(true);
        });
    });

    // Testes para moveStudentFromExternalQueueToTurnstile
    describe('moveStudentFromExternalQueueToTurnstile', () => {
        it('should move a student from external queue to turnstile', () => {
            cafeteria.addStudentToExternalQueue(student);
            const registrationTime = cafeteria.moveStudentFromExternalQueueToTurnstile();
            expect(registrationTime).toBe(student.getRegistrationTime());
            expect(cafeteria.hasSomeoneInTurnstile()).toBe(true);
        });

        it('should throw an error if turnstile is occupied', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            expect(() => cafeteria.moveStudentFromExternalQueueToTurnstile()).toThrow("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        });

        it('should throw an error if turnstile is locked', () => {
            cafeteria.lockTheTurnstile();
            expect(() => cafeteria.moveStudentFromExternalQueueToTurnstile()).toThrow("Não é possível adicionar um estudante a uma catraca que está trancada.");
        });
    });

    // Testes para moveStudentFromTurnstileToInternalQueue
    describe('moveStudentFromTurnstileToInternalQueue', () => {
        it('should move a student from turnstile to internal queue', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            const result = cafeteria.moveStudentFromTurnstileToInternalQueue();
            expect(result).toBe(true);
            expect(cafeteria.hasSomeoneInInternalQueue()).toBe(true);
        });
    });

    // Testes para moveStudentFromInternalQueueToService
    describe('moveStudentFromInternalQueueToService', () => {
        it('should move a student from internal queue to service', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            const result = cafeteria.moveStudentFromInternalQueueToService();
            expect(result).toBe(true);
            expect(cafeteria.hasSomeoneInService()).toBe(true);
        });

        it('should throw an error if service is occupied', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
            expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        });

        it('should throw an error if no tables are available', () => {
            cafeteria = new Cafeteria(5, 1, 0); // Mesa com limite 0
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
        });
    });

    describe('moveStudentFromServiceToTable', () => {
        it('should throw an error if no students are in service', () => {
            // Verifica se o erro é lançado quando não há estudantes no serviço
            expect(() => cafeteria.moveStudentFromServiceToTable()).toThrow(
                "Não há estudantes no serviço para mover para a mesa."
            );
        });
    
        it('should throw an error if no tables are available', () => {
            // Configuração do cenário: preenche todas as mesas
            cafeteria = new Cafeteria(5, 1, 0); // Mesa com limite 0
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
    
            // Forçar a adição do estudante ao serviço sem verificar a mesa
            cafeteria['service'].addStudent(student); // Acesso privado ao serviço para forçar o estado
    
            // Verificação da exceção
            expect(() => cafeteria.moveStudentFromServiceToTable()).toThrow(
                "Não é possível adicionar estudantes a uma mesa que já está ocupada."
            );
        });
    
        it('should move a student from service to table if tables are available', () => {
            // Configuração do cenário: adiciona um estudante ao serviço e move para a mesa
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
    
            // Move o estudante do serviço para a mesa
            const movedStudent = cafeteria.moveStudentFromServiceToTable();
            expect(movedStudent).toBe(student);
            expect(cafeteria.checkManyStudentsAreInTable()).toBe(1);
        });
    });
    

    // Testes para timeStenpInService
    describe('timeStenpInService', () => {
        it('should return the time stamp in service', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
            const timeStamp = cafeteria.timeStenpInService();
            expect(timeStamp).toBe(student.getAttendedTime());
        });
    });

    // Testes para removeStudentFromCafeteria
    describe('removeStudentFromCafeteria', () => {
        it('should remove a student from cafeteria', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
            cafeteria.moveStudentFromServiceToTable();
            cafeteria.removeStudentFromCafeteria(student);
            expect(cafeteria.checkManyStudentsAreInTable()).toBe(0);
        });
    });

    // Testes para hasSomeoneInService
    describe('hasSomeoneInService', () => {
        it('should return true if someone is in service', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
            expect(cafeteria.hasSomeoneInService()).toBe(true);
        });

        it('should return false if no one is in service', () => {
            expect(cafeteria.hasSomeoneInService()).toBe(false);
        });
    });

    // Testes para checkServiceLocked
    describe('checkServiceLocked', () => {
        it('should return true if service is locked', () => {
            cafeteria.lockTheService();
            expect(cafeteria.checkServiceLocked()).toBe(true);
        });

        it('should return false if service is unlocked', () => {
            expect(cafeteria.checkServiceLocked()).toBe(false);
        });
    });

    // Testes para lockTheService e unlockTheService
    describe('lockTheService and unlockTheService', () => {
        it('should lock the service', () => {
            const result = cafeteria.lockTheService();
            expect(result).toBe(true);
            expect(cafeteria.checkServiceLocked()).toBe(true);
        });

        it('should unlock the service', () => {
            cafeteria.lockTheService();
            const result = cafeteria.unlockTheService();
            expect(result).toBe(true);
            expect(cafeteria.checkServiceLocked()).toBe(false);
        });
    });

    // Testes para hasTableAvaliable
    describe('hasTableAvaliable', () => {
        it('should return true if tables are available', () => {
            // Verifica se há mesas disponíveis (nenhum estudante na mesa)
            expect(cafeteria.hasTableAvaliable()).toBe(true);
        });

        it('should return false if no tables are available', () => {
            // Configuração do cenário: preenche todas as mesas
            cafeteria = new Cafeteria(5, 1, 1); // Limite de 1 mesa
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
            cafeteria.moveStudentFromServiceToTable();

            // Verifica se não há mesas disponíveis
            expect(cafeteria.hasTableAvaliable()).toBe(false);
        });
    });

    // Testes para hasSomeoneInTurnstile
    describe('hasSomeoneInTurnstile', () => {
        it('should return true if someone is in turnstile', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            expect(cafeteria.hasSomeoneInTurnstile()).toBe(true);
        });

        it('should return false if no one is in turnstile', () => {
            expect(cafeteria.hasSomeoneInTurnstile()).toBe(false);
        });
    });

    // Testes para checkTurnstileLocked
    describe('checkTurnstileLocked', () => {
        it('should return true if turnstile is locked', () => {
            cafeteria.lockTheTurnstile();
            expect(cafeteria.checkTurnstileLocked()).toBe(true);
        });

        it('should return false if turnstile is unlocked', () => {
            expect(cafeteria.checkTurnstileLocked()).toBe(false);
        });
    });

    // Testes para lockTheTurnstile e unlockTheTurnstile
    describe('lockTheTurnstile and unlockTheTurnstile', () => {
        it('should lock the turnstile', () => {
            const result = cafeteria.lockTheTurnstile();
            expect(result).toBe(true);
            expect(cafeteria.checkTurnstileLocked()).toBe(true);
        });

        it('should unlock the turnstile', () => {
            cafeteria.lockTheTurnstile();
            const result = cafeteria.unlockTheTurnstile();
            expect(result).toBe(true);
            expect(cafeteria.checkTurnstileLocked()).toBe(false);
        });
    });

    // Testes para checkInternalQueueSize
    describe('checkInternalQueueSize', () => {
        it('should return the size of the internal queue', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            expect(cafeteria.checkInternalQueueSize()).toBe(1);
        });
    });

    // Testes para checkInternalQueueLimitRecheadMaximum
    describe('checkInternalQueueLimitRecheadMaximum', () => {
        it('should return true if internal queue limit is reached', () => {
            cafeteria = new Cafeteria(1, 1, 10); // Fila interna com limite 1
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            expect(cafeteria.checkInternalQueueLimitRecheadMaximum()).toBe(true);
        });

        it('should return false if internal queue limit is not reached', () => {
            expect(cafeteria.checkInternalQueueLimitRecheadMaximum()).toBe(false);
        });
    });

    // Testes para checkManyStudentsAreInTable
    describe('checkManyStudentsAreInTable', () => {
        it('should return the number of students in the table', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            cafeteria.moveStudentFromInternalQueueToService();
            cafeteria.moveStudentFromServiceToTable();
            expect(cafeteria.checkManyStudentsAreInTable()).toBe(1);
        });
    });

    // Testes para getSizeOfExternalQueue
    describe('getSizeOfExternalQueue', () => {
        it('should return the size of the external queue', () => {
            cafeteria.addStudentToExternalQueue(student);
            expect(cafeteria.getSizeOfExternalQueue()).toBe(1);
        });
    });

    // Testes para hasSomeoneInExternalQueue
    describe('hasSomeoneInExternalQueue', () => {
        it('should return true if someone is in external queue', () => {
            cafeteria.addStudentToExternalQueue(student);
            expect(cafeteria.hasSomeoneInExternalQueue()).toBe(true);
        });

        it('should return false if no one is in external queue', () => {
            expect(cafeteria.hasSomeoneInExternalQueue()).toBe(false);
        });
    });

    // Testes para hasSomeoneInInternalQueue
    describe('hasSomeoneInInternalQueue', () => {
        it('should return true if someone is in internal queue', () => {
            cafeteria.addStudentToExternalQueue(student);
            cafeteria.moveStudentFromExternalQueueToTurnstile();
            cafeteria.moveStudentFromTurnstileToInternalQueue();
            expect(cafeteria.hasSomeoneInInternalQueue()).toBe(true);
        });

        it('should return false if no one is in internal queue', () => {
            expect(cafeteria.hasSomeoneInInternalQueue()).toBe(false);
        });
    });

    // Testes para getInternalQueueLimit
    describe('getInternalQueueLimit', () => {
        it('should return the internal queue limit', () => {
            expect(cafeteria.getInternalQueueLimit()).toBe(5);
        });
    });

    // Testes para geturnstileLimit
    describe('geturnstileLimit', () => {
        it('should return the turnstile limit', () => {
            expect(cafeteria.geturnstileLimit()).toBe(1);
        });
    });
});