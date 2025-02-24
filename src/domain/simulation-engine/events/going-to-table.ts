import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToHome } from "./going-to-home";
import { UnlockService } from "./unlock-service";
import { GoingToService } from "./going-to-service";

export class GoingToTable extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição do Atendimento para a Mesa: ${this.getTimeStamp()}`);

        //Alteração do estado do Sistema
        const timeToBeAttended: number = this.cafeteria.moveStudentFromServiceToTable();
        console.log(`Quantidade de Alunos nas Mesas: ${this.cafeteria.checkStudentsInTable()}`);

        //Variáveis para controle e geração de novos Eventos
        const totalTimeStenpInTable: number = this.getTimeStamp() + timeToBeAttended;

        //Variáveis para controle e geração de novos Eventos
        const serviceIsLocked: boolean = this.cafeteria.checkServiceLocked();
        const hasStudentsInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();

        if (serviceIsLocked && hasStudentsInInternalQueue && hasTableAvaliable) {
            const scheduling2: Event = new UnlockService(this.getTimeStamp(), this.cafeteria, this.machine);
            const scheduling3: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling2);
            this.machine.addEvent(scheduling3);
        }

        //Possíveis novos Eventos gerados a partir deste Evento
        const scheduling1: Event = new GoingToHome(totalTimeStenpInTable, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling1);
    }
}