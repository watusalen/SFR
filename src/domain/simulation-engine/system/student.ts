export class Student {
    private arrivalMoment: number | undefined;
    private serviceMoment: number | undefined;
    private timeToServe: number;
    private registrationTime: number;
    private tableTime: number;
    
    constructor(registrationTime: number, timeToServe: number, tableTime: number) {
        this.registrationTime = registrationTime;
        this.timeToServe = timeToServe;
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

    public getRegistrationTime(): number {
        if (!this.registrationTime) {
            throw new Error("O momento de digitação do estudante não foi definido.");
        }
        return this.registrationTime;
    }

    public getTimeToServe(): number {
        if (!this.registrationTime) {
            throw new Error("O momento que ele foi servido não foi definido.");
        }
        return this.registrationTime;
    }

    public getTableTime(): number {
        if (!this.serviceMoment) {
            throw new Error("O momento de atendimento do estudante não foi definido.");
        }
        return this.tableTime;
    }
}