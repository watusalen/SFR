import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { TurnstileTransition } from "./going-to-turnstile";

export class StudentArrival extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {

        console.log(`Evento - Chegada do estudante: ${this.getTimeStamp()}`);

        const someoneInTurnstile: boolean = this.cafeteria.hasSomeoneInTurnstile();
        const checkTunstileLocked: boolean = this.cafeteria.checkTurnstileLocked();
        const sucess: boolean = this.cafeteria.addStudentToExternalQueue(this.student);

        if (sucess && !someoneInTurnstile && !checkTunstileLocked) {
            const scheduling: Event = new TurnstileTransition(this.getTimeStamp(), this.cafeteria, this.machine, this.student);
            this.machine.addEvent(scheduling);
        }

    }
}