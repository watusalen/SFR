import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";
import { GoingToService } from "./going-to-service";

/**
 * @class UnlockService
 * @extends Event
 * @description Representa o evento de desbloqueio do serviço de atendimento no refeitório.
 * Gerencia o desbloqueio do serviço e agenda a ida de um estudante para o atendimento, se aplicável.
 */
export class UnlockService extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe UnlockService.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de desbloqueio do serviço.
     * Desbloqueia o serviço de atendimento e agenda a ida de um estudante para o atendimento,
     * se houver estudantes na fila interna.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Atendimento destrancado: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: desbloqueia o serviço
        this.cafeteria.unlockTheService();

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const hasSomeoneInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();

        // Se houver estudantes na fila interna, agenda a ida para o atendimento
        if (hasSomeoneInInternalQueue) {
            const scheduling: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}