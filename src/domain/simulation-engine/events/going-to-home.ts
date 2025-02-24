import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { UnlockService } from "./unlock-service";
import { GoingToService } from "./going-to-service";
import { UnlockTurnstile } from "./unlock-turnstile";

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
        const hasTableAvaliable : boolean = this.cafeteria.hasTableAvaliable();
        // console.log(`tem gente na fila interna? ${hasStudentsInInternalQueue}`);
        // console.log(`tem mesa? ${hasTableAvaliable}`);

        //Possíveis novos Eventos gerados a partir deste Evento
        if (hasStudentsInInternalQueue && hasTableAvaliable) {
            const scheduling1: Event = new UnlockService(this.getTimeStamp(), this.cafeteria, this.machine);
            const scheduling2: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling1);
            this.machine.addEvent(scheduling2);
        }
        
        const turnstileIsLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();
        const internalQueueGotShorter : boolean = this.cafeteria.checkInternalQueueGotShorter();

        // console.log(`catraca ta trancada? ${turnstileIsLocked}`);
        // console.log(`tem gente la fora? ${hasSomeoneInExternalQueue}`);
        // console.log(`a fila diminuiu? ${internalQueueGotShorter}`);
 
        //Possíveis novos Eventos gerados a partir deste Evento
        if (turnstileIsLocked && hasSomeoneInExternalQueue && internalQueueGotShorter) {
            const scheduling3 : Event = new UnlockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling3);
        }
    }
}