import { StudentArrival } from '@/domain/simulation-engine/events/student-arrival';
import { EventMachine } from '@/domain/simulation-engine/events/event-machine';
import { Cafeteria } from '@/domain/simulation-engine/system/cafeteria';
import { Student } from '@/domain/simulation-engine/system/student';
import { GoingToTurnstile } from '@/domain/simulation-engine/events/going-to-turnstile';

describe('StudentArrival', () => {
    let eventMachine: EventMachine;
    let cafeteria: Cafeteria;
    let student: Student;
    let studentArrival: StudentArrival;

    beforeEach(() => {
        eventMachine = new EventMachine();
        cafeteria = new Cafeteria(10, 5, 5); // limit: 10, averageServingTime: 5, amount: 5
        student = new Student(1, 1000, 2000); // id: 1, registrationTime: 1000, tableTime: 2000, attendedTime: 3000
        studentArrival = new StudentArrival(1000, cafeteria, eventMachine, student);
    });

    // Teste para verificar se o estudante é adicionado à fila externa
    test('deve adicionar o estudante à fila externa', () => {
        // Espiona o método addStudentToExternalQueue da cafeteria
        const spy = jest.spyOn(cafeteria, 'addStudentToExternalQueue');

        // Processa o evento
        studentArrival.processEvent();

        // Verifica se o estudante foi adicionado à fila externa
        expect(spy).toHaveBeenCalledWith(student);
    });

    // Teste para verificar se o evento GoingToTurnstile é criado quando a catraca está livre e destrancada
    test('deve criar um evento GoingToTurnstile se a catraca estiver livre e destrancada', () => {
        // Configura o cenário: catraca livre e destrancada
        jest.spyOn(cafeteria, 'hasSomeoneInTurnstile').mockReturnValue(false);
        jest.spyOn(cafeteria, 'checkTurnstileLocked').mockReturnValue(false);

        // Espiona o método addEvent da máquina de eventos
        const spy = jest.spyOn(eventMachine, 'addEvent');

        // Processa o evento
        studentArrival.processEvent();

        // Verifica se o evento GoingToTurnstile foi adicionado à máquina de eventos
        expect(spy).toHaveBeenCalledWith(expect.any(GoingToTurnstile));
    });

    // Teste para verificar se o evento GoingToTurnstile NÃO é criado quando a catraca está ocupada
    test('não deve criar um evento GoingToTurnstile se a catraca estiver ocupada', () => {
        // Configura o cenário: catraca ocupada
        jest.spyOn(cafeteria, 'hasSomeoneInTurnstile').mockReturnValue(true);
        jest.spyOn(cafeteria, 'checkTurnstileLocked').mockReturnValue(false);

        // Espiona o método addEvent da máquina de eventos
        const spy = jest.spyOn(eventMachine, 'addEvent');

        // Processa o evento
        studentArrival.processEvent();

        // Verifica se o evento GoingToTurnstile NÃO foi adicionado à máquina de eventos
        expect(spy).not.toHaveBeenCalledWith(expect.any(GoingToTurnstile));
    });

    // Teste para verificar se o evento GoingToTurnstile NÃO é criado quando a catraca está trancada
    test('não deve criar um evento GoingToTurnstile se a catraca estiver trancada', () => {
        // Configura o cenário: catraca trancada
        jest.spyOn(cafeteria, 'hasSomeoneInTurnstile').mockReturnValue(false);
        jest.spyOn(cafeteria, 'checkTurnstileLocked').mockReturnValue(true);

        // Espiona o método addEvent da máquina de eventos
        const spy = jest.spyOn(eventMachine, 'addEvent');

        // Processa o evento
        studentArrival.processEvent();

        // Verifica se o evento GoingToTurnstile NÃO foi adicionado à máquina de eventos
        expect(spy).not.toHaveBeenCalledWith(expect.any(GoingToTurnstile));
    });
});