import { Event } from "./event";
import { Observator } from "./observator";

/**
 * @class EventMachine
 * @description Gerencia a fila de eventos e processa os eventos em ordem cronológica.
 * Mantém o tempo de simulação e um observador para coletar dados.
 */
export class EventMachine {
    /**
     * @property eventQueue
     * @type {Array<Event>}
     * @description Fila de eventos a serem processados.
     */
    eventQueue: Array<Event> = [];

    /**
     * @private
     * @property simulationTime
     * @type {number}
     * @description Tempo atual da simulação.
     */
    private simulationTime: number = 0;

    /**
     * @private
     * @property observator
     * @type {Observator}
     * @description Observador para coletar dados durante a simulação.
     */
    private observator: Observator = new Observator();

    /**
     * @public
     * @method processEvents
     * @description Processa todos os eventos na fila em ordem cronológica.
     */
    public processEvents(): void {
        this.getObservator().realStartTime = Date.now();
        while (this.eventQueue.length > 0) {
            // Ordena a fila de eventos pelo timestamp
            this.eventQueue.sort((event1, event2) => event1.getTimeStamp() - event2.getTimeStamp());
            // Remove e processa o próximo evento
            const event: Event = this.eventQueue.shift()!;
            event.processEvent();
            // Atualiza o tempo de simulação
            this.updateSimulationTime(event.getTimeStamp());
        }
        this.getObservator().realEndTime = Date.now();
    }

    /**
     * @public
     * @method addEvent
     * @param {Event} event - O evento a ser adicionado à fila.
     * @description Adiciona um evento à fila de eventos.
     */
    public addEvent(event: Event): void {
        this.eventQueue.push(event);
    }

    /**
     * @public
     * @method getObservator
     * @returns {Observator} - O observador da simulação.
     * @description Retorna o observador que coleta dados durante a simulação.
     */
    public getObservator(): Observator {
        return this.observator;
    }

    public getSimulationTime():number {
        return this.simulationTime;
    }

    /**
     * @private
     * @method updateSimulationTime
     * @param {number} newSimulationTime - O novo tempo de simulação.
     * @description Atualiza o tempo de simulação, garantindo que não volte no tempo.
     * @throws {Error} - Lança um erro se o novo tempo for menor que o tempo atual.
     */
    private updateSimulationTime(newSimulationTime: number): void {
        if (newSimulationTime < this.simulationTime) {
            throw new Error("Você não pode voltar no tempo.");
        }
        this.simulationTime = newSimulationTime;
    }
}