import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";

export class UnlockTurnstile extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        console.log(`Evento - Catraca destrancada: ${this.getTimeStamp()}`);

        const sucess: boolean = this.cafeteria.unlockTheTurnstile();

        if (sucess) {
            console.log(`Catraca destrancada com sucesso: ${this.getTimeStamp()}`);
        }
    }
}