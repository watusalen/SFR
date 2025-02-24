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

        //Alteração do estado do Sistema
        const timeToType: number = this.cafeteria.moveStudentFromExternalQueueToTurnstile();
        const timeStenpTyping: number = this.getTimeStamp() + timeToType;

        //Possíveis novos Eventos gerados a partir deste Evento        
        const scheduling1: Event = new GoingToInternalQueue(timeStenpTyping, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling1);
    }
}