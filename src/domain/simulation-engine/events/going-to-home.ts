import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { UnlockService } from "./unlock-service";
import { GoingToService } from "./going-to-service";
import { UnlockTurnstile } from "./unlock-turnstile";
import { GoingToTurnstile } from "./going-to-turnstile";

export class GoingToHome extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Mesa para Casa: ${this.getTimeStamp()}`);

        //Alteração do estado do Sistema
        this.cafeteria.removeStudentFromCafeteria();
        console.log(`Quantidade de Alunos nas Mesas: ${this.cafeteria.checkStudentsInTable()}`);

        //Variáveis para controle e geração de novos Eventos
        const hasStudentsInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();
        
        //Possíveis novos Eventos gerados a partir deste Evento
        let resposta: string = this.cafeteria.checkServiceLocked ? "Sim" : "Não";
        console.log(`Serviço está trancado? ${resposta}`);

        const scheduling1: Event = new UnlockService(this.getTimeStamp(), this.cafeteria, this.machine);
        this.machine.addEvent(scheduling1);
        if (hasStudentsInInternalQueue) {
            const scheduling2: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling2);
        }
        
        const turnstileIsLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();
        const internalQueueLimitRecheadMaximum: boolean = this.cafeteria.checkInternalQueueLimitRecheadMaximum();

        //Possíveis novos Eventos gerados a partir deste Evento
        if (turnstileIsLocked && hasSomeoneInExternalQueue && !internalQueueLimitRecheadMaximum) {
            const scheduling3: Event = new UnlockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            const scheduling4: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling3);
            this.machine.addEvent(scheduling4);
        }
    }
}