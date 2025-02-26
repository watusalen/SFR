import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { UnlockTurnstile } from "./unlock-turnstile";
import { GoingToTable } from "./going-to-table";

export class GoingToService extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Fila Interna para o Atendimento: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        this.cafeteria.moveStudentFromInternalQueueToService();

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const manyStudentsAreInInternalQueue: number = this.cafeteria.checkInternalQueueSize();
        const internalQueueLimit: number = this.cafeteria.getInternalQueueLimit();
        const placesForTheTurnstileRelease: number = this.cafeteria.geturnstileLimit();
        const internalQueueSmallerThanLimit: boolean = (internalQueueLimit - manyStudentsAreInInternalQueue) >= placesForTheTurnstileRelease;
        const studentTimeToBeAttended: number = this.getTimeStamp() + this.cafeteria.timeStenpInService();
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();

        //Se a quantidade de pessoas na Fila Interna for o suficiente para que a Catraca libere
        if (internalQueueSmallerThanLimit && turnstileAreLocked) {
            const scheduling01: Event = new UnlockTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        //Ele chegou aqui e foi atendido. Um tempo depois, foi pra mesa.
        const scheduling02: Event = new GoingToTable(studentTimeToBeAttended, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling02);
    }
}