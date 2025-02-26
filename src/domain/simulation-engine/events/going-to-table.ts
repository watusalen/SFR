import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToHome } from "./going-to-home";
import { UnlockService } from "./unlock-service";
import { GoingToService } from "./going-to-service";
import { Student } from "../system/student";
import { LockService } from "./lock-service";

export class GoingToTable extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição do Atendimento para a Mesa: ${this.getTimeStamp()}`);

        //Alteração DESTE EVENTO no estado do Sistema
        const student: Student = this.cafeteria.moveStudentFromServiceToTable();

        //Variáveis de controle e cirscuntâncias que irão gerar NOVOS eventos a partir deste
        const hasTableAvaliable: boolean = this.cafeteria.hasTableAvaliable();
        const hasSomeoneInInternalQueue: boolean = this.cafeteria.hasSomeoneInInternalQueue();
        const serviceAreLocked: boolean = this.cafeteria.checkServiceLocked();
        const timeInTable: number = this.getTimeStamp() + student.getTableTime();
        const hasSomeoneInService: boolean = this.cafeteria.hasSomeoneInService();

        //Se depois que esse estudante chegou não houverem mais mesas vazias, o Atendimento é trancado.
        if (!hasTableAvaliable) {
            const scheduling01: Event = new LockService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling01);
        }

        //Se o Atendimento não estiver trancado e tem alguém na Fila Interna ele manda alguém que está lá pro Atendimento
        if (!serviceAreLocked && hasSomeoneInInternalQueue && !hasSomeoneInService && hasTableAvaliable) {
            const scheduling02: Event = new GoingToService(this.getTimeStamp(), this.cafeteria, this.machine);
            this.machine.addEvent(scheduling02);
        }

        //Depois de um tempo na mesa, o estudante vai pra casa.
        const scheduling03: Event = new GoingToHome(timeInTable, this.cafeteria, this.machine, student);
        this.machine.addEvent(scheduling03);
    }
}