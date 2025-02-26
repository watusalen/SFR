import { Event } from "./event";

export class ObserveInternalQueue extends Event {
    processEvent(): void {
        console.log(`Evento - Observação da Fila Interna: ${this.getTimeStamp()}`);
        const internalQueueSize : number = this.cafeteria.checkInternalQueueSize();
        this.machine.getObservator().observerInternalQueueSize(this.getTimeStamp(), internalQueueSize);
    }
}