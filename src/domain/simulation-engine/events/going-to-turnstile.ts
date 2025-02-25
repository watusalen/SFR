import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToInternalQueue } from "./going-to-internal-queue";

export class GoingToTurnstile extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Fila Externa para a Catraca: ${this.getTimeStamp()}`)

        //Alteração DESTE EVENTO no estado do Sistema
        const studentTimeToTypeInTurnstile: number = this.cafeteria.moveStudentFromExternalQueueToTurnstile();

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const totalTimeToTypeInTurnstile: number = this.getTimeStamp() + studentTimeToTypeInTurnstile;
        console.log(`Ele vai entrar em qual segundo?: ${totalTimeToTypeInTurnstile}`);

        //Se o estudante passou pela catraca é porque ele PODE ir para a Fila Interna
        const scheduling: Event = new GoingToInternalQueue(totalTimeToTypeInTurnstile, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling);
    }
}