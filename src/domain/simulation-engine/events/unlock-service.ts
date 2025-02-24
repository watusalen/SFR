import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";

export class UnlockService extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        console.log(`Evento - Atendimento destrancado: ${this.getTimeStamp()}`);
        this.cafeteria.unlockTheService();
    }
}