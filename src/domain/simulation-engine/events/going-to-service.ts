import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToTable } from "./going-to-table";

export class GoingToService extends Event {
    private student: Student;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {

        console.log(`Evento - Transição da Fila Interna para o Atendimento: ${this.getTimeStamp()}`)

        const sucess = this.cafeteria.moveStudentFromInternalQueueToService();
        
        if(sucess){
            const scheduling : Event = new GoingToTable(this.getTimeStamp(), this.cafeteria, this.machine, this.student);
            this.machine.addEvent(scheduling);
        }

    }
}