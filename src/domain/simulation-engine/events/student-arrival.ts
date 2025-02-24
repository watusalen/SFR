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

        //Alteração do estado do Sistema
        this.cafeteria.addStudentToExternalQueue(this.student);
        console.log(`Quantidade de Alunos na Fila Externa: ${this.cafeteria.getStudents()}`);
        //Variáveis para controle de geração de novos Eventos
        const hasSomeoneInTurnstile: boolean = this.cafeteria.hasSomeoneInTurnstile();
        const checkTunstileLocked: boolean = this.cafeteria.checkTurnstileLocked();

        //Possíveis novos Eventos gerados a partir deste Evento
        if (!hasSomeoneInTurnstile && !checkTunstileLocked) {
            const scheduling: Event = new GoingToTurnstile(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }
    }
}