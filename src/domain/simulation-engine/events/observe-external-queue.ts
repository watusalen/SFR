import { Event } from "./event";

export class ObserveExternalQueue extends Event {
    processEvent(): void {
        console.log(`Evento - Observação da Fila Externa: ${this.getTimeStamp()}`);
        const externalQueueSize: number = this.cafeteria.getSizeOfExternalQueue();
        this.machine.getObservator().observerExternalQueueSize(this.getTimeStamp(), externalQueueSize);
    }
}