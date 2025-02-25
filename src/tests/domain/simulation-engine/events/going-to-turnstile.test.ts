import { GoingToTurnstile } from '@/domain/simulation-engine/events/going-to-turnstile';
import { EventMachine } from '@/domain/simulation-engine/events/event-machine';
import { Cafeteria } from '@/domain/simulation-engine/system/cafeteria';
import { GoingToInternalQueue } from '@/domain/simulation-engine/events/going-to-internal-queue';

describe('GoingToTurnstile', () => {
    let eventMachine: EventMachine;
    let cafeteria: Cafeteria;
    let goingToTurnstile: GoingToTurnstile;

    beforeEach(() => {
        eventMachine = new EventMachine();
        cafeteria = new Cafeteria(10, 5, 5); // limit: 10, averageServingTime: 5, amount: 5
        goingToTurnstile = new GoingToTurnstile(1000, cafeteria, eventMachine);
    });

    // Teste para verificar se o estudante é movido da fila externa para a catraca
    test('deve mover o estudante da fila externa para a catraca', () => {
        // Espiona o método moveStudentFromExternalQueueToTurnstile da cafeteria
        const spy = jest.spyOn(cafeteria, 'moveStudentFromExternalQueueToTurnstile').mockReturnValue(500); // Tempo de digitação: 500

        // Processa o evento
        goingToTurnstile.processEvent();

        // Verifica se o método moveStudentFromExternalQueueToTurnstile foi chamado
        expect(spy).toHaveBeenCalled();
    });

    // Teste para verificar se o evento GoingToInternalQueue é criado corretamente
    test('deve criar um evento GoingToInternalQueue com o tempo correto', () => {
        // Configura o tempo de digitação na catraca
        jest.spyOn(cafeteria, 'moveStudentFromExternalQueueToTurnstile').mockReturnValue(500); // Tempo de digitação: 500

        // Espiona o método addEvent da máquina de eventos
        const spy = jest.spyOn(eventMachine, 'addEvent');

        // Processa o evento
        goingToTurnstile.processEvent();

        // Verifica se o evento GoingToInternalQueue foi criado com o tempo correto
        expect(spy).toHaveBeenCalledWith(expect.any(GoingToInternalQueue));
        const addedEvent = spy.mock.calls[0][0] as GoingToInternalQueue; // Pega o evento adicionado
        expect(addedEvent.getTimeStamp()).toBe(1500); // 1000 (timestamp inicial) + 500 (tempo de digitação)
    });

    // Teste para verificar se o evento GoingToInternalQueue é adicionado à máquina de eventos
    test('deve adicionar o evento GoingToInternalQueue à máquina de eventos', () => {
        // Configura o tempo de digitação na catraca
        jest.spyOn(cafeteria, 'moveStudentFromExternalQueueToTurnstile').mockReturnValue(500); // Tempo de digitação: 500

        // Espiona o método addEvent da máquina de eventos
        const spy = jest.spyOn(eventMachine, 'addEvent');

        // Processa o evento
        goingToTurnstile.processEvent();

        // Verifica se o evento GoingToInternalQueue foi adicionado à máquina de eventos
        expect(spy).toHaveBeenCalledWith(expect.any(GoingToInternalQueue));
    });
});