import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { InternalQueueTransition } from "./going-to-internal-queue";

export class TurnstileTransition extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {

        console.log(`Evento - Transição da Fila Externa para a Catraca: ${this.getTimeStamp()}`)

        const sucess = this.cafeteria.moveStudentFromExternalQueueToTurnstile();

        if (sucess) {
            const scheduling : Event = new InternalQueueTransition(this.getTimeStamp(), this.cafeteria, this.machine, this.student);
            this.machine.addEvent(scheduling);
        }

    }
}