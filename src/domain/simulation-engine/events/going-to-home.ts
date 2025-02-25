import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { Student } from "../system/student";
import { UnlockService } from "./unlock-service";

export class GoingToHome extends Event {
    student: Student;
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine, student: Student) {
        super(timestamp, cafeteria, machine);
        this.student = student;
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição da Mesa para Casa: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        this.cafeteria.removeStudentFromCafeteria(this.student);

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();

        //Se o Atendimento estiver trancado e houver alguém na Fila Interna
        if (serviceAreLocked) {
            const scheduling: Event = new UnlockService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling);
        }

    }
}