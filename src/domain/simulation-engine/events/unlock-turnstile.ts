import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";
import { GoingToTurnstile } from "./going-to-turnstile";

export class UnlockTurnstile extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Catraca destrancada: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        this.cafeteria.unlockTheTurnstile();

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();

        //A Catraca é desbloqueada. Caso haja alguém na Fila Externa, ele manda pra dentro do Refeitório;
        if(hasSomeoneInExternalQueue){
            const scheduling : Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}