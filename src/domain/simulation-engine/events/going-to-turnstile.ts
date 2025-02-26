import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToInternalQueue } from "./going-to-internal-queue";

/**
 * @class GoingToTurnstile
 * @extends Event
 * @description Representa o evento de transição de um estudante da fila externa para a catraca.
 * Gerencia a movimentação do estudante e agenda o evento de ida para a fila interna.
 */
export class GoingToTurnstile extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe GoingToTurnstile.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de transição para a catraca.
     * Move o estudante da fila externa para a catraca, calcula o tempo total para digitar a matrícula,
     * e agenda o evento de ida para a fila interna.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Transição da Fila Externa para a Catraca: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: move o estudante da fila externa para a catraca
        const studentTimeToTypeInTurnstile: number = this.cafeteria.moveStudentFromExternalQueueToTurnstile();

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const totalTimeToTypeInTurnstile: number = this.getTimeStamp() + studentTimeToTypeInTurnstile;

        // Agenda o evento de ida para a fila interna após o tempo de digitação na catraca
        const scheduling: Event = new GoingToInternalQueue(totalTimeToTypeInTurnstile, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling);
    }
}