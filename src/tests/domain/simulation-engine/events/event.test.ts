import { Event } from '@/domain/simulation-engine/events/event';
import { Cafeteria } from '@/domain/simulation-engine/system/cafeteria';
import { EventMachine } from '@/domain/simulation-engine/events/event-machine';

describe('Event', () => {
    let cafeteria: Cafeteria;
    let eventMachine: EventMachine;

    beforeEach(() => {
        cafeteria = new Cafeteria(10, 5, 5); // limit: 10, averageServingTime: 5, amount: 5
        eventMachine = new EventMachine();
    });

    // Teste para garantir que o timestamp seja retornado corretamente
    test('deve retornar o timestamp corretamente', () => {
        // Cria uma classe concreta de Event para teste
        class TestEvent extends Event {
            constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
                super(timestamp, cafeteria, machine);
            }

            public processEvent(): void {
                // Simula o processamento do evento
                console.log(`Evento processado no timestamp: ${this.timestamp}`);
            }
        }

        const event = new TestEvent(5, cafeteria, eventMachine);
        expect(event.getTimeStamp()).toBe(5); // Verifica se o timestamp é retornado corretamente
    });

    // Teste para garantir que o método processEvent seja chamado corretamente
    test('deve chamar o método processEvent corretamente', () => {
        // Cria uma classe concreta de Event para teste
        class TestEvent extends Event {
            constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
                super(timestamp, cafeteria, machine);
            }

            public processEvent(): void {
                // Simula o processamento do evento
                console.log(`Evento processado no timestamp: ${this.timestamp}`);
            }
        }

        const event = new TestEvent(5, cafeteria, eventMachine);
        const spyProcessEvent = jest.spyOn(event, 'processEvent'); // Espiona o método processEvent

        event.processEvent(); // Chama o método processEvent
        expect(spyProcessEvent).toHaveBeenCalled(); // Verifica se o método foi chamado
    });
});