import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";
import { GoingToTurnstile } from "./going-to-turnstile";

/**
 * @class UnlockTurnstile
 * @extends Event
 * @description Representa o evento de desbloqueio da catraca no refeitório.
 * Gerencia o desbloqueio da catraca e agenda a ida de um estudante para a catraca, se aplicável.
 */
export class UnlockTurnstile extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe UnlockTurnstile.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de desbloqueio da catraca.
     * Desbloqueia a catraca e agenda a ida de um estudante para a catraca,
     * se houver estudantes na fila externa.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Catraca destrancada: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: desbloqueia a catraca
        this.cafeteria.unlockTheTurnstile();

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();

        // Se houver estudantes na fila externa, agenda a ida para a catraca
        if (hasSomeoneInExternalQueue) {
            const scheduling: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}