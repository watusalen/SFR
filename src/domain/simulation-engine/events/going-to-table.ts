import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";
import { GoingToHome } from "./going-to-home";

export class GoingToTable extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log
        console.log(`Evento - Transição do Atendimento para a Mesa: ${this.getTimeStamp()}`);

        //Alteração do estado do Sistema
        const timeToBeAttended: number = this.cafeteria.moveStudentFromServiceToTable();
        console.log(`Quantidade de Alunos nas Mesas: ${this.cafeteria.checkStudentsInTable()}`);
        //Variáveis para controle e geração de novos Eventos
        const totalTimeStenpInTable : number = this.getTimeStamp() + timeToBeAttended;
        //Possíveis novos Eventos gerados a partir deste Evento
        const scheduling: Event = new GoingToHome(totalTimeStenpInTable, this.cafeteria, this.machine);
        this.machine.addEvent(scheduling);
    }
}