import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToInternalQueue } from "./going-to-internal-queue";
import { UnlockTurnstile } from "./unlock-turnstile";
import { LockTurnstile } from "./lock-turnstile";

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

        //Log
        const verificador = this.cafeteria.hasSomeoneInTurnstile() ? "Sim" : "Não";
        console.log(`Tem gente na catraca?: ${verificador}`);

        //Variáveis para controle e geração de novos Eventos

        //Possíveis novos Eventos gerados a partir deste Evento
        const scheduling1: Event = new GoingToInternalQueue(timeStenpTyping, this.cafeteria, this.machine);
        const scheduling2: Event = new LockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
        this.machine.addEvent(scheduling1);
        this.machine.addEvent(scheduling2);
    }
}