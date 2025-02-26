import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { Student } from "../system/student";
import { UnlockService } from "./unlock-service";

/**
 * @class GoingToHome
 * @extends Event
 * @description Representa o evento de saída de um estudante do refeitório.
 * Gerencia a remoção do estudante do sistema e verifica condições para desbloquear o serviço.
 */
export class GoingToHome extends Event {
    /**
     * @property student
     * @type {Student}
     * @description O estudante que está saindo do refeitório.
     */
    student: Student;

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @param {Student} student - O estudante que está saindo.
     * @description Inicializa uma nova instância da classe GoingToHome.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de saída do estudante.
     * Remove o estudante do refeitório e verifica se o serviço precisa ser desbloqueado.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Transição da Mesa para Casa: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: remove o estudante do refeitório
        this.cafeteria.removeStudentFromCafeteria(this.student);

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();

        // Se o serviço estiver bloqueado, agenda o desbloqueio
        if (serviceAreLocked) {
            const scheduling: Event = new UnlockService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}