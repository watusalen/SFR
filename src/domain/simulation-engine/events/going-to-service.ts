import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { UnlockTurnstile } from "./unlock-turnstile";
import { GoingToTable } from "./going-to-table";
import { Student } from "../system/student";

/**
 * @class GoingToService
 * @extends Event
 * @description Representa o evento de transição de um estudante da fila interna para o atendimento.
 * Gerencia a movimentação do estudante, verifica condições para desbloquear a catraca,
 * e agenda o evento de ida para a mesa após o atendimento.
 */
export class GoingToService extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe GoingToService.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de transição para o atendimento.
     * Move o estudante da fila interna para o atendimento, verifica se a fila interna tem espaço suficiente
     * para desbloquear a catraca, agenda o evento de ida para a mesa após o atendimento, e registra o tempo de espera.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Transição da Fila Interna para o Atendimento: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: move o estudante da fila interna para o atendimento
        const student: Student = this.cafeteria.moveStudentFromInternalQueueToService();

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const manyStudentsAreInInternalQueue: number = this.cafeteria.checkInternalQueueSize();
        const internalQueueLimit: number = this.cafeteria.getInternalQueueLimit();
        const placesForTheTurnstileRelease: number = this.cafeteria.geturnstileLimit();
        const internalQueueSmallerThanLimit: boolean = (internalQueueLimit - manyStudentsAreInInternalQueue) >= placesForTheTurnstileRelease;
        const studentTimeToBeAttended: number = this.getTimeStamp() + student.getAttendedTime();
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();
        student.setServiceMoment(studentTimeToBeAttended);

        // Se a fila interna tiver espaço suficiente para desbloquear a catraca, agenda o desbloqueio
        if (internalQueueSmallerThanLimit && turnstileAreLocked) {
            const scheduling01: Event = new UnlockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        // Agenda o evento de ida para a mesa após o tempo de atendimento
        const scheduling02: Event = new GoingToTable(studentTimeToBeAttended, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling02);

        // Observações: registra o tempo de espera do estudante
        this.machine.getObservator().observeWaitingTime(student.getTimeToServe());
    }
}