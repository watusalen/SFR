import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";

/**
 * @class LockTurnstile
 * @extends Event
 * @description Representa o evento de bloqueio da catraca no refeitório.
 * Gerencia o bloqueio da catraca quando a fila interna atinge sua capacidade máxima.
 */
export class LockTurnstile extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe LockTurnstile.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de bloqueio da catraca.
     * Bloqueia a catraca no refeitório.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Catraca trancada: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: bloqueia a catraca
        this.cafeteria.lockTheTurnstile();
    }
}