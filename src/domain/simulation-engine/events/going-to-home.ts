import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";

export class GoingToHome extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {

        console.log(`Evento - Transição da Mesa para Casa: ${this.getTimeStamp()}`)

        const sucess = this.cafeteria.removeStudentFromCafeteria();

    }
}