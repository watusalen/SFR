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
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();

        //Possíveis novos Eventos gerados a partir deste Evento
        if (hasStudentsInInternalQueue && hasTableAvaliable) {
            const scheduling1: Event = new UnlockService(this.getTimeStamp(), this.cafeteria, this.machine);
            const scheduling2: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling1);
            this.machine.addEvent(scheduling2);
        }

        //Verificação para desbloquear a catraca
        const turnstileIsLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();
        const internalQueueGotShorter: boolean = this.cafeteria.checkInternalQueueGotShorter();

        if (turnstileIsLocked && hasSomeoneInExternalQueue && internalQueueGotShorter) {
            console.log("Fila interna tem vagas suficientes! Catraca será liberada.");
            const scheduling3: Event = new UnlockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling3);
        }
    }
}