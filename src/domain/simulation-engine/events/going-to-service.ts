import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTable } from "./going-to-table";
import { UnlockService } from "./unlock-service";

export class GoingToService extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Fila Interna para o Atendimento: ${this.getTimeStamp()}`);

        //Alteração do estado do Sistema
        this.cafeteria.moveStudentFromInternalQueueToService();

        //Log
        const verificador = this.cafeteria.hasSomeoneInService() ? "Sim" : "Não";
        console.log(`Tem alguém no Atendimento?: ${verificador}`);

        //Variáveis para controle e geração de novos Eventos
        const timeToBeServed: number = this.cafeteria.timeStenpInService();
        const totalTimeToBeServed: number = this.getTimeStamp() + timeToBeServed;

        //Variáveis para controle e geração de novos Eventos
        const serviceIsLocked: boolean = this.cafeteria.checkServiceLocked();
        const hasStudentsInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();

        //Possíveis novos Eventos gerados a partir deste Evento
        const scheduling1: Event = new GoingToTable(totalTimeToBeServed, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling1);

        if (serviceIsLocked && hasStudentsInInternalQueue && hasTableAvaliable) {
            const scheduling2 : Event = new UnlockService(totalTimeToBeServed, this.cafeteria, this.machine);
            const scheduling3 : Event = new GoingToService(totalTimeToBeServed, this.cafeteria, this.machine);
            this.machine.addEvent(scheduling2);
            this.machine.addEvent(scheduling3);
        }
    }
}