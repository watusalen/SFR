import { GoingToInternalQueue } from '@/domain/simulation-engine/events/going-to-internal-queue';
import { EventMachine } from '@/domain/simulation-engine/events/event-machine';
import { Cafeteria } from '@/domain/simulation-engine/system/cafeteria';
import { LockTurnstile } from '@/domain/simulation-engine/events/lock-turnstile';
import { GoingToService } from '@/domain/simulation-engine/events/going-to-service';
import { GoingToTurnstile } from '@/domain/simulation-engine/events/going-to-turnstile';

describe('GoingToInternalQueue', () => {
    let eventMachine;
    let cafeteria;
    let goingToInternalQueue;

    beforeEach(() => {
        eventMachine = new EventMachine();
        cafeteria = new Cafeteria(10, 5, 5); // limit: 10, averageServingTime: 5, amount: 5
        goingToInternalQueue = new GoingToInternalQueue(1000, cafeteria, eventMachine);
    });

    test('deve mover o estudante da catraca para a fila interna', () => {
        const spy = jest.spyOn(cafeteria, 'moveStudentFromTurnstileToInternalQueue');
        goingToInternalQueue.processEvent();
        expect(spy).toHaveBeenCalled();
    });

    test('deve criar um evento LockTurnstile se a fila interna atingir o limite máximo', () => {
        jest.spyOn(cafeteria, 'checkInternalQueueLimitRecheadMaximum').mockReturnValue(true);
        const spy = jest.spyOn(eventMachine, 'addEvent');
        goingToInternalQueue.processEvent();
        expect(spy).toHaveBeenCalledWith(expect.any(LockTurnstile));
    });

    test('deve criar um evento GoingToService se o atendimento não estiver trancado e a fila interna tiver apenas um estudante', () => {
        jest.spyOn(cafeteria, 'checkServiceLocked').mockReturnValue(false);
        jest.spyOn(cafeteria, 'hasSomeoneInService').mockReturnValue(false);
        jest.spyOn(cafeteria, 'checkInternalQueueSize').mockReturnValue(1);
        jest.spyOn(cafeteria, 'hasTableAvaliable').mockReturnValue(true);
        
        const spy = jest.spyOn(eventMachine, 'addEvent');
        goingToInternalQueue.processEvent();
        expect(spy).toHaveBeenCalledWith(expect.any(GoingToService));
    });

    test('deve criar um evento GoingToTurnstile se houver alguém na fila externa e a catraca estiver destrancada', () => {
        jest.spyOn(cafeteria, 'hasSomeoneInExternalQueue').mockReturnValue(true);
        jest.spyOn(cafeteria, 'checkTurnstileLocked').mockReturnValue(false);
        jest.spyOn(cafeteria, 'checkInternalQueueLimitRecheadMaximum').mockReturnValue(false);

        const spy = jest.spyOn(eventMachine, 'addEvent');
        goingToInternalQueue.processEvent();
        expect(spy).toHaveBeenCalledWith(expect.any(GoingToTurnstile));
    });
});
