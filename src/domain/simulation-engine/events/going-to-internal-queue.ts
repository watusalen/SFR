import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToService } from "./going-to-service";
import { GoingToTurnstile } from "./going-to-turnstile";

export class GoingToInternalQueue extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Catraca para a Fila Interna: ${this.getTimeStamp()}`);

        //Alteração do estado do Sistema
        const sucess: boolean = this.cafeteria.moveStudentFromTurnstileToInternalQueue();

        console.log(`Quantidade de Alunos na Fila Interna: ${this.cafeteria.checkInternalQueueSize()}`);

        //Variáveis para controle e geração de novos Eventos
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();
        const serviceIsLocked: boolean = this.cafeteria.checkServiceLocked();

        //Possíveis novos Eventos gerados a partir deste Evento
        if (sucess && !hasSomeoneInService && !serviceIsLocked) {
            const scheduling: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}