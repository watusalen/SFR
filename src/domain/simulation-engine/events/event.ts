import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";

export abstract class Event {
    protected timestamp: number;
    protected cafeteria : Cafeteria;
    protected machine : EventMachine;

    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine){
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    public getTimeStamp(): number{
        return this.timestamp;
    }

    abstract processEvent(): void;
}