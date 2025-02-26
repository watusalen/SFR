import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTurnstile } from "./going-to-turnstile";
import { LockTurnstile } from "./lock-turnstile";
import { GoingToService } from "./going-to-service";

/**
 * @class GoingToInternalQueue
 * @extends Event
 * @description Representa o evento de transição de um estudante da catraca para a fila interna.
 * Gerencia a movimentação do estudante, verifica condições para bloquear a catraca,
 * e agenda eventos subsequentes como ir para o atendimento ou permitir a entrada de mais alunos.
 */
export class GoingToInternalQueue extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe GoingToInternalQueue.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de transição para a fila interna.
     * Move o estudante da catraca para a fila interna, verifica se a fila interna atingiu o limite,
     * e agenda eventos subsequentes com base nas condições do sistema.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Transição da Catraca para a Fila Interna: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: move o estudante da catraca para a fila interna
        this.cafeteria.moveStudentFromTurnstileToInternalQueue();

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const internalQueueRecheadMaximumSize: boolean = this.cafeteria.checkInternalQueueLimitRecheadMaximum();
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const internalQueueSize: number = this.cafeteria.checkInternalQueueSize();
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();

        // Se a fila interna atingiu o limite máximo, agenda o bloqueio da catraca
        if (internalQueueRecheadMaximumSize) {
            const scheduling01: Event = new LockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        // Se o serviço estiver disponível e a fila interna tiver apenas este estudante, agenda a ida para o atendimento
        if (!serviceAreLocked && !hasSomeoneInService && (internalQueueSize == 1) && hasTableAvaliable) {
            const scheduling02: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling02);
        }

        // Se a catraca estiver desbloqueada e houver alguém na fila externa, agenda a ida para a catraca
        if (!turnstileAreLocked && hasSomeoneInExternalQueue && !internalQueueRecheadMaximumSize) {
            const scheduling03: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling03);
        }
    }
}