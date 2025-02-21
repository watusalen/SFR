import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToService } from "./goingo-to-service";

export class InternalQueueTransition extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {

        console.log(`Evento - Transição da Catraca para Fila Interna: ${this.getTimeStamp()}`)

        const sucess = this.cafeteria.moveStudentFromTurnstileToInternalQueue();
        
        if(sucess){
            const scheduling : Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine, this.student);
            this.machine.addEvent(scheduling);
        }

    }
}