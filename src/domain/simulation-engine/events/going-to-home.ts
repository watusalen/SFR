import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";
import { Event } from "./event";

export class GoingToHome extends Event {

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        super(timestamp, cafeteria, machine);
    }

    processEvent(): void {
        //Log

        console.log(`Evento - Transição da Mesa para Casa: ${this.getTimeStamp()}`);
        //Alteração do estado do Sistema
        this.cafeteria.removeStudentFromCafeteria();
        console.log(`Quantidade de Alunos nas Mesas: ${this.cafeteria.checkStudentsInTable()}`);
        //Variáveis para controle e geração de novos Eventos

        //Possíveis novos Eventos gerados a partir deste Evento

    }
}