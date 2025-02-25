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
        console.log(`Fila Interna atingiu o tamanho máximo?: ${internalQueueRecheadMaximumSize}`);

        //Se a Fila Interna (depois que esse aluno chegou) atingir o limite máximo
        if (internalQueueRecheadMaximumSize) {
            console.log(`Fila Interna atingiu o tamanho máximo.`);
            const scheduling01: Event = new LockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        const hasSomeoneInExternalQueue: boolean = this.cafeteria.hasSomeoneInExternalQueue();
        console.log(`Tem alguém na fila Externa?: ${hasSomeoneInExternalQueue}`);
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();
        console.log(`Tem alguém na Catraca?: ${turnstileAreLocked}`);
        const internalQueueSize: number = this.cafeteria.checkInternalQueueSize();
        console.log(`Tamanho da Fila Interna?: ${internalQueueSize}`);
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();
        console.log(`Atendimento está trancado?: ${serviceAreLocked}`);
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();
        console.log(`Tem alguém no Atendimento?: ${hasSomeoneInService}`);
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();
        console.log(`Tem mesa disponível?: ${hasTableAvaliable}`);

        //Vai direto pro Atendimento se não estiver trancado e não houver ninguém na fila interna além dele
        if (!serviceAreLocked && !hasSomeoneInService && (internalQueueSize == 1) && hasTableAvaliable) {
            console.log(`Da Fila Interna foi direto pro Atendimento porque não tinha ninguém.`);
            const scheduling02: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling02);
        }
        // if (!serviceAreLocked && !hasSomeoneInService && (internalQueueSize == 1)) {
        //     console.log(`Da Fila Interna foi direto pro Atendimento porque não tinha ninguém.`);
        //     const scheduling02: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
        //     this.machine.addEvent(scheduling02);
        // }

        // //Se houver alguém na Fila Externa e ela estiver destrancada
        if (!turnstileAreLocked && hasSomeoneInExternalQueue && !internalQueueRecheadMaximumSize) {
            console.log(`A Catraca estava destrancada e havia alguém lá fora`);
            const scheduling03: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling03);
        }
        // if (!turnstileAreLocked && hasSomeoneInExternalQueue && !internalQueueRecheadMaximumSize) {
        //     console.log(`A Catraca estava destrancada e havia alguém lá fora`);
        //     const scheduling03: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
        //     this.machine.addEvent(scheduling03);
        // }
    }
}