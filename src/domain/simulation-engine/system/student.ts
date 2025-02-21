export class Student {
    private arrivalMoment: number | undefined;
    private serviceMoment: number | undefined;
    private timeToType: number;
    private tableTime: number;

    constructor(timeToType: number, tableTime: number) {
        this.timeToType = timeToType;
        this.tableTime = tableTime;
    }

    public setArrivalMoment(arrivalMoment: number): void {
        this.arrivalMoment = arrivalMoment;
    }

    public setServiceMoment(serviceMoment: number): void {
        this.serviceMoment = serviceMoment;
    }

    public getArrivalMoment(): number {
        if (!this.arrivalMoment) {
            throw new Error("O momento de chegada do estudante não foi definido.");
        }
        return this.arrivalMoment;
    }

    public getServiceMoment(): number {
        if (!this.serviceMoment) {
            throw new Error("O momento de atendimento do estudante não foi definido.");
        }
        return this.serviceMoment;
    }

    public getTimeToType(): number {
        return this.timeToType;
    }

    public getTableTime(): number {
        return this.tableTime;
    }
}