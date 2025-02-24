import { Event } from "./event";

export class EventMachine {
    eventQueue: Array<Event>;
    simulationTime: number;

    constructor() {
        this.eventQueue = [];
        this.simulationTime = 0;
    }

    public processEvents(): void {
        while (this.eventQueue.length > 0) {
            this.eventQueue.sort((event1, event2) => event1.getTimeStamp() - event2.getTimeStamp());
            const event: Event = this.eventQueue.shift()!;
            event.processEvent();
        }
    }

    public addEvent(event: Event): void {
        this.eventQueue.push(event);
    }

    private updateSimulationTime(newSimulationTime: number): void {
        if (newSimulationTime < this.simulationTime) {
            throw new Error("Você não pode voltar no tempo.");
        }
        this.simulationTime = newSimulationTime;
    }

}

