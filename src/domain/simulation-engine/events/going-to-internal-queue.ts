import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTurnstile } from "./going-to-turnstile";
import { LockTurnstile } from "./lock-turnstile";
import { GoingToService } from "./going-to-service";

export class GoingToInternalQueue extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Catraca para a Fila Interna: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        this.cafeteria.moveStudentFromTurnstileToInternalQueue();

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const internalQueueRecheadMaximumSize: boolean = this.cafeteria.checkInternalQueueLimitRecheadMaximum();
        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const internalQueueSize: number = this.cafeteria.checkInternalQueueSize();
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();

        //Se a Fila Interna (depois que esse aluno chegou) atingir o limite máximo
        if (internalQueueRecheadMaximumSize) {
            const scheduling01: Event = new LockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        //Vai direto pro Atendimento se não estiver trancado e não houver ninguém na fila interna além dele
        if (!serviceAreLocked && !hasSomeoneInService && (internalQueueSize == 1) && hasTableAvaliable) {
            const scheduling02: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling02);
        }

        //Se houver alguém na Fila Externa e ela estiver destrancada
        if (!turnstileAreLocked && hasSomeoneInExternalQueue && !internalQueueRecheadMaximumSize) {
            const scheduling03: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling03);
        }
    }
}