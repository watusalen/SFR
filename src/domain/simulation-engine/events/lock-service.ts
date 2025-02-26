import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";

/**
 * @class LockService
 * @extends Event
 * @description Representa o evento de bloqueio do serviço de atendimento no refeitório.
 * Gerencia o bloqueio do serviço quando necessário.
 */
export class LockService extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe LockService.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de bloqueio do serviço.
     * Bloqueia o serviço de atendimento no refeitório.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Atendimento trancado: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: bloqueia o serviço
        this.cafeteria.lockTheService();
    }
}