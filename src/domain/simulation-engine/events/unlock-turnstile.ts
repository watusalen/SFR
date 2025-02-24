import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";
import { GoingToTurnstile } from "./going-to-turnstile";

export class UnlockTurnstile extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        console.log(`Evento - Catraca destrancada: ${this.getTimeStamp()}`);
        console.log(`${this.cafeteria.checkInternalQueueSize()}`)
        this.cafeteria.unlockTheTurnstile();

        if (this.cafeteria.hasSomeoneInExternalQueue()) {
            const scheduling: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}