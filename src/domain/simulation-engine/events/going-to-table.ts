import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToHome } from "./going-to-home";
import { GoingToService } from "./going-to-service";
import { Student } from "../system/student";
import { LockService } from "./lock-service";

/**
 * @class GoingToTable
 * @extends Event
 * @description Representa o evento de transição de um estudante do atendimento para a mesa.
 * Gerencia a movimentação do estudante, verifica condições para bloquear o serviço,
 * e agenda eventos subsequentes como ir para o serviço ou ir para casa.
 */
export class GoingToTable extends Event {

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe GoingToTable.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    /**
     * @public
     * @method processEvent
     * @description Processa o evento de transição para a mesa.
     * Move o estudante do atendimento para a mesa, verifica se há mesas disponíveis,
     * agenda o bloqueio do serviço se não houver mesas, agenda a ida para o serviço se houver estudantes na fila interna,
     * e agenda a ida para casa após o tempo na mesa.
     */
    processEvent(): void {
        // Log do evento
        console.log(`Evento - Transição do Atendimento para a Mesa: ${this.getTimeStamp()}`);

        // Alteração do estado do sistema: move o estudante do atendimento para a mesa
        const student: Student = this.cafeteria.moveStudentFromServiceToTable();

        // Variáveis de controle e circunstâncias para gerar novos eventos
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();
        const hasSomeoneInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();
        const timeInTable: number = this.getTimeStamp() + student.getTableTime();
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();
        const tableOccupancy : number = this.cafeteria.checkManyStudentsAreInTable();

        // Se não houver mesas disponíveis, agenda o bloqueio do serviço
        if (!hasTableAvaliable) {
            const scheduling01: Event = new LockService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        // Se o serviço estiver desbloqueado e houver estudantes na fila interna, agenda a ida para o serviço
        if (!serviceAreLocked && hasSomeoneInInternalQueue && !hasSomeoneInService && hasTableAvaliable) {
            const scheduling02: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling02);
        }

        // Agenda a ida para casa após o tempo na mesa
        const scheduling03: Event = new GoingToHome(timeInTable, this.cafeteria, this.machine, student);
        this.machine.addEvent(scheduling03);

        //Observações
        if(student){
            this.machine.getObservator().observeMaxTableOcuppancy(tableOccupancy);
        }
    }
}