import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTurnstile } from "./going-to-turnstile";

export class StudentArrival extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Chegada do estudante: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        const sucess : boolean = this.cafeteria.addStudentToExternalQueue(this.student);
        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const hasSomeoneInTurnstile: boolean = this.cafeteria.hasSomeoneInTurnstile();
        const turnstileAreLocked: boolean = this.cafeteria.checkTurnstileLocked();
        console.log(`Tem alguém na Catraca?: ${hasSomeoneInTurnstile}`);
        console.log(`A Catraca tá trancada?: ${turnstileAreLocked}`);

        //Caso não haja ninguém na catraca e ela estiver destrancada, o evento de Ida a Catraca acontece
        if (sucess && !hasSomeoneInTurnstile && !turnstileAreLocked) {
            const scheduling: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}