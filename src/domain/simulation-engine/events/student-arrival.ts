import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTurnstile } from "./going-to-turnstile";

/**
 * @class StudentArrival
 * @extends Event
 * @description Representa o evento de chegada de um estudante à fila externa do refeitório.
 * Gerencia a adição do estudante à fila e a criação do evento de ida à catraca, se aplicável.
 */
export class StudentArrival extends Event {
    /**
     * @private
     * @property student
     * @type {Student}
     * @description O estudante que chegou à fila externa.
     */
    private student: Student;

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @param {Student} student - O estudante que chegou.
     * @description Inicializa uma nova instância da classe StudentArrival.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de chegada do estudante.
     * Adiciona o estudante à fila externa, registra o momento de chegada,
     * e agenda o evento de ida à catraca se a catraca estiver disponível.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Chegada do estudante: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: adiciona o estudante à fila externa
        const success: boolean = this.cafeteria.addStudentToExternalQueue(this.student);
        this.student.setArrivalMoment(this.getTimeStamp());
        console.log(this.cafeteria.getSizeOfExternalQueue())
        // Variáveis de controle e circunstâncias para gerar novos eventos
        const hasSomeoneInTurnstile: boolean = this.cafeteria.hasSomeoneInTurnstile();
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();

        // Caso não haja ninguém na catraca e ela estiver destrancada, agenda o evento de ida à catraca
        if (success && !hasSomeoneInTurnstile && !turnstileAreLocked) {
            const scheduling: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }

        // Observações: registra a chegada do estudante se a adição à fila for bem-sucedida
        if (success) {
            this.machine.getObservator().observeStudentAttended();
        }
    }
}