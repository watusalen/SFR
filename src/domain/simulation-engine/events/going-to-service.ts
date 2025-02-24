import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTable } from "./going-to-table";
import { LockService } from "./lock-service";

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
        const verification = this.cafeteria.hasSomeoneInService() ? "Sim" : "Não";
        console.log(`Tem alguém no Atendimento?: ${verification}`);

        //Variáveis para controle e geração de novos Eventos
        const timeToBeServed: number = this.cafeteria.timeStenpInService();
        const totalTimeToBeServed: number = this.getTimeStamp() + timeToBeServed;

        //Possíveis novos Eventos gerados a partir deste Evento
        const scheduling1: Event = new LockService(this.getTimeStamp(), this.cafeteria, this.machine);
        const scheduling2: Event = new GoingToTable(totalTimeToBeServed, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling1);
        this.machine.addEvent(scheduling2);
    }
}