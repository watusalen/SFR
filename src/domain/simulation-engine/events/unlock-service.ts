import { Event } from "./event";
import { EventMachine } from "./event-machine";
import { Cafeteria } from "../system/cafeteria";
import { GoingToService } from "./going-to-service";

export class UnlockService extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Atendimento destrancado: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        this.cafeteria.unlockTheService();

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const hasSomeoneInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();

        //Se houver alguém na Fila Interna ele é enviado pro Atendimento
        if(hasSomeoneInInternalQueue){
            const scheduling : Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}