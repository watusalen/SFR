import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { TurnstileTransition } from "./turnstile-transition";

class StudentArrival extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {

        console.log(`Evento - Chegada de estudante: ${this.getTimeStamp()}`);

        const someoneInTurnstile: boolean = this.cafeteria.hasSomeoneInTurnstile();
        const checkTunstileStatus : boolean = this.cafeteria.checkTurnstileStatus();
        const sucess : boolean = this.cafeteria.addStudentToExternalQueue(this.student);

        if (sucess && !someoneInTurnstile && !checkTunstileStatus) {
            const scheduling : Event = new TurnstileTransition(this.getTimeStamp(), this.cafeteria, this.machine, this.student);
            this.machine.addEvent(scheduling);
        }

    }
}