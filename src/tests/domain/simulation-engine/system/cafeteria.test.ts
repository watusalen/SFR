import { Cafeteria } from "@/domain/simulation-engine/system/cafeteria";
import { Student } from "@/domain/simulation-engine/system/student";

describe('Cafeteria', () => {
    let cafeteria: Cafeteria;
    let student1: Student;
    let student2: Student;

    beforeEach(() => {
        cafeteria = new Cafeteria(2, 1, 1); // internalQueueLimit = 2, turnstileLimit = 1, tableLimit = 1
        student1 = new Student(10, 2); // registrationTime = 10, tableTime = 2
        student2 = new Student(15, 3); // registrationTime = 15, tableTime = 3
    });

    // Testes para addStudentToExternalQueue
    it('should add a student to the external queue', () => {
        expect(cafeteria.addStudentToExternalQueue(student1)).toBe(true);
    });

    // Testes para moveStudentFromExternalQueueToTurnstile
    it('should move a student from external queue to turnstile', () => {
        cafeteria.addStudentToExternalQueue(student1);
        expect(cafeteria.moveStudentFromExternalQueueToTurnstile()).toBe(true);
    });

    it('should throw an error when moving a student to an occupied turnstile', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.addStudentToExternalQueue(student2);
        expect(() => cafeteria.moveStudentFromExternalQueueToTurnstile()).toThrow("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
    });

    it('should throw an error when moving a student to a locked turnstile', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.lockTheTurnstile();
        expect(() => cafeteria.moveStudentFromExternalQueueToTurnstile()).toThrow("Não é possível adicionar um estudante a uma catraca que está trancada.");
    });

    // Testes para moveStudentFromTurnstileToInternalQueue
    it('should move a student from turnstile to internal queue', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        expect(cafeteria.moveStudentFromTurnstileToInternalQueue()).toBe(true);
    });

    it('should throw an error when moving a student to a full internal queue', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        expect(() => cafeteria.moveStudentFromTurnstileToInternalQueue()).toThrow("Não é possível adicionar um estudante a uma fila interna que já está cheia.");
    });

    // Testes para moveStudentFromInternalQueueToService
    it('should move a student from internal queue to service', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(cafeteria.moveStudentFromInternalQueueToService()).toBe(true);
    });

    it('should throw an error when moving a student to an occupied service', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow("Não é possível adicionar um estudante a um serviço que já está ocupado.");
    });

    it('should throw an error when moving a student to service with all tables occupied', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable();
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow("Não é possível adicionar estudantes a uma mesa que já está ocupada.");
    });

    // Testes para moveStudentFromServiceToTable
    it('should move a student from service to table', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        expect(cafeteria.moveStudentFromServiceToTable()).toBe(true);
    });

    // Testes para removeStudentFromCafeteria
    it('should remove a student from cafeteria', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable();
        expect(cafeteria.removeStudentFromCafeteria()).toBe(student1);
    });

    // Testes para hasSomeoneInService
    it('should check if someone is in the service', () => {
        expect(cafeteria.hasSomeoneInService()).toBe(false);
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        expect(cafeteria.hasSomeoneInService()).toBe(true);
    });

    // Testes para serviceLockBecauseHasSomeone
    it('should lock the service because someone is in it', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        expect(cafeteria.serviceLockBecauseHasSomeone()).toBe(true);
    });

    // Testes para checkServiceLocked
    it('should check if the service is locked', () => {
        expect(cafeteria.checkServiceLocked()).toBe(false);
        cafeteria.lockTheService();
        expect(cafeteria.checkServiceLocked()).toBe(true);
    });

    // Testes para lockTheService
    it('should lock the service', () => {
        expect(cafeteria.lockTheService()).toBe(true);
    });

    // Testes para unlockTheService
    it('should unlock the service', () => {
        cafeteria.lockTheService();
        expect(cafeteria.unlockTheService()).toBe(true);
    });

    // Testes para checkAllTablesAreOccupied
    it('should check if all tables are occupied', () => {
        expect(cafeteria.checkAllTablesAreOccupied()).toBe(false);
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable();
        expect(cafeteria.checkAllTablesAreOccupied()).toBe(true);
    });

    // Testes para hasTableAvaliable
    it('should check if there is a table available', () => {
        expect(cafeteria.hasTableAvaliable()).toBe(true);
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable();
        expect(cafeteria.hasTableAvaliable()).toBe(false);
    });

    // Testes para serviceLockBecauseTableIsFull
    it('should lock the service because all tables are occupied', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable();
        expect(cafeteria.serviceLockBecauseTableIsFull()).toBe(true);
    });

    // Testes para serviceUnlockBecauseTableGotEmpty
    it('should unlock the service because a table got empty', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable();
        cafeteria.removeStudentFromCafeteria();
        expect(cafeteria.serviceUnlockBecauseTableGotEmpty()).toBe(true);
    });

    // Testes para hasSomeoneInTurnstile
    it('should check if someone is in the turnstile', () => {
        expect(cafeteria.hasSomeoneInTurnstile()).toBe(false);
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        expect(cafeteria.hasSomeoneInTurnstile()).toBe(true);
    });

    // Testes para checkTurnstileLocked
    it('should check if the turnstile is locked', () => {
        expect(cafeteria.checkTurnstileLocked()).toBe(false);
        cafeteria.lockTheTurnstile();
        expect(cafeteria.checkTurnstileLocked()).toBe(true);
    });

    // Testes para lockTheTurnstile
    it('should lock the turnstile', () => {
        expect(cafeteria.lockTheTurnstile()).toBe(true);
    });

    // Testes para unlockTheTurnstile
    it('should unlock the turnstile', () => {
        cafeteria.lockTheTurnstile();
        expect(cafeteria.unlockTheTurnstile()).toBe(true);
    });

    // Testes para turnstileLockBecauseHasSomeone
    it('should lock the turnstile because someone is in it', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        expect(cafeteria.turnstileLockBecauseHasSomeone()).toBe(true);
    });

    // Testes para turnstileUnlockBecauseHasNoOne
    it('should unlock the turnstile because no one is in it', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(cafeteria.turnstileUnlockBecauseHasNoOne()).toBe(true);
    });

    // Testes para turnstileUnlockBecauseTheQueueGotShorter
    it('should unlock the turnstile because the internal queue got shorter', () => {
        // Adiciona o primeiro estudante à fila externa
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();

        // Adiciona o segundo estudante à fila externa
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();

        // Move o primeiro estudante da fila interna para o serviço
        cafeteria.moveStudentFromInternalQueueToService();

        // Move o primeiro estudante do serviço para a mesa
        cafeteria.moveStudentFromServiceToTable();

        // Remove o primeiro estudante da mesa
        cafeteria.removeStudentFromCafeteria();

        // Verifica se a catraca foi destravada
        expect(cafeteria.turnstileUnlockBecauseTheQueueGotShorter()).toBe(true);
    });

    it('should return false when the internal queue did not get shorter', () => {
        // Adiciona estudantes à fila externa
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.addStudentToExternalQueue(student2);
    
        // Move os estudantes para a catraca e fila interna
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
    
        // Verifica se a fila interna não ficou mais curta
        expect(cafeteria.checkInternalQueueGotShorter()).toBe(false);
    });

    // Testes para turnstileLockBecauseQueueIsFull
    it('should lock the turnstile because the internal queue is full', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(cafeteria.turnstileLockBecauseQueueIsFull()).toBe(true);
    });

    // Testes para checkInternalQueueSize
    it('should check the size of the internal queue', () => {
        expect(cafeteria.checkInternalQueueSize()).toBe(0);
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(cafeteria.checkInternalQueueSize()).toBe(1);
    });

    // Testes para checkInternalQueueGotShorter
    it('should check if the internal queue got shorter', () => {
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.moveStudentFromInternalQueueToService();
        cafeteria.moveStudentFromServiceToTable(); // Adiciona o estudante à mesa
        cafeteria.removeStudentFromCafeteria(); // Remove o estudante da mesa
        expect(cafeteria.checkInternalQueueGotShorter()).toBe(true);
    });


    // Testes para checkInternalQueueLimitRecheadMaximum
    it('should check if the internal queue limit is reached', () => {
        expect(cafeteria.checkInternalQueueLimitRecheadMaximum()).toBe(false);
        cafeteria.addStudentToExternalQueue(student1);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        cafeteria.addStudentToExternalQueue(student2);
        cafeteria.moveStudentFromExternalQueueToTurnstile();
        cafeteria.moveStudentFromTurnstileToInternalQueue();
        expect(cafeteria.checkInternalQueueLimitRecheadMaximum()).toBe(true);
    });
});