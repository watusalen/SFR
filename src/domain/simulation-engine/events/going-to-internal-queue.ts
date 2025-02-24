import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToService } from "./going-to-service";
import { GoingToTurnstile } from "./going-to-turnstile";
import { UnlockTurnstile } from "./unlock-turnstile";

export class GoingToInternalQueue extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Catraca para a Fila Interna: ${this.getTimeStamp()}`);

        //Alteração do estado do Sistema
        this.cafeteria.moveStudentFromTurnstileToInternalQueue();

        //Log
        console.log(`Quantidade de Alunos na Fila Interna: ${this.cafeteria.checkInternalQueueSize()}`);

        //Variáveis para controle e geração de novos Eventos
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();
        const serviceIsLocked: boolean = this.cafeteria.checkServiceLocked();

        //Possíveis novos Eventos gerados a partir deste Evento
        if (!hasSomeoneInService && !serviceIsLocked) {
            const scheduling1: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling1);
        }

        //Variáveis para controle e geração de novos Eventos
        const turnstileIsLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const internalQueueLimitRecheadMaximum: boolean = this.cafeteria.checkInternalQueueLimitRecheadMaximum();

        //Possíveis novos Eventos gerados a partir deste Evento
        if (turnstileIsLocked && !internalQueueLimitRecheadMaximum) {
            const scheduling3: Event = new UnlockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            const scheduling4: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);          
            this.machine.addEvent(scheduling3);
            this.machine.addEvent(scheduling4);
        }
    }
}