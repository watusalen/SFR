import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";

export class UnlockTurnstile extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        console.log(`Evento - Catraca destrancada: ${this.getTimeStamp()}`);
        this.cafeteria.unlockTheTurnstile();
    }
}