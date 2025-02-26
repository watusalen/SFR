import { Event } from "./event";

export class ObserveTable extends Event {
    processEvent(): void {
        const manyTableAreOcuppied : number = this.cafeteria.checkManyStudentsAreInTable();
        this.machine.getObservator().observeTableOccupancy(this.getTimeStamp(), manyTableAreOcuppied);
    }
}