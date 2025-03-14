import { EventMachine } from '@/domain/simulation-engine/events/event-machine';
import { Event } from '@/domain/simulation-engine/events/event';
import { Cafeteria } from '@/domain/simulation-engine/system/cafeteria';

describe('EventMachine', () => {
    let eventMachine: EventMachine;
    let cafeteria: Cafeteria;

    beforeEach(() => {
        eventMachine = new EventMachine();
        cafeteria = new Cafeteria(10, 5, 5); // limit: 10, averageServingTime: 5, amount: 5
    });

    // Teste para processar eventos na ordem correta
    test('deve processar eventos na ordem correta', () => {
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

        // Adiciona eventos com timestamps diferentes
        const event1 = new TestEvent(10, cafeteria, eventMachine);
        const event2 = new TestEvent(5, cafeteria, eventMachine);
        const event3 = new TestEvent(15, cafeteria, eventMachine);

        eventMachine.addEvent(event1);
        eventMachine.addEvent(event2);
        eventMachine.addEvent(event3);

        // Processa os eventos
        eventMachine.processEvents();

        // Verifica se os eventos foram processados na ordem correta
        expect(eventMachine['eventQueue'].length).toBe(0); // Verifica se a fila de eventos está vazia
    });

    // Teste para adicionar eventos à fila
    test('deve adicionar eventos à fila', () => {
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
        eventMachine.addEvent(event);

        expect(eventMachine['eventQueue'].length).toBe(1); // Verifica se o evento foi adicionado à fila
    });

    // Teste para atualizar o tempo da simulação corretamente
    test('deve atualizar o tempo da simulação corretamente', () => {
        eventMachine['updateSimulationTime'](10); // Atualiza o tempo da simulação para 10
        expect(eventMachine['simulationTime']).toBe(10); // Verifica se o tempo foi atualizado
    });

    // Teste para lançar erro ao tentar retroceder no tempo
    test('deve lançar erro ao tentar retroceder no tempo', () => {
        eventMachine['updateSimulationTime'](10); // Atualiza o tempo da simulação para 10
        expect(() => eventMachine['updateSimulationTime'](5)).toThrow(
            "Você não pode voltar no tempo."
        );
    });
});