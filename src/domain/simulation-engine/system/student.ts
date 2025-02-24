export class Student {
    private arrivalMoment: number | undefined;
    private serviceMoment: number | undefined;
    private timeToServe: number | undefined;
    private registrationTime: number;
    private attendedTime: number;
    private tableTime: number;

    constructor(registrationTime: number, tableTime: number, attendedTime: number) {
        this.registrationTime = registrationTime;
        this.tableTime = tableTime;
        this.attendedTime = attendedTime;
    }

    public setArrivalMoment(arrivalMoment: number): void {
        this.arrivalMoment = arrivalMoment;
    }

    public setServiceMoment(serviceMoment: number): void {
        this.serviceMoment = serviceMoment;
    }

    public setTimeToServe(): void {
        if (!this.arrivalMoment || !this.serviceMoment) {
            throw new Error("Os momentos de chegada e atendimento devem ser definidos antes de calcular o tempo de atendimento.");
        }
        this.timeToServe = this.serviceMoment - this.arrivalMoment;
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
        if (!this.timeToServe) {
            throw new Error("O tempo da chegada até o atendimento não foi definido.");
        }
        return this.timeToServe;
    }

    public getTableTime(): number {
        if (!this.tableTime) {
            throw new Error("O momento de atendimento do estudante não foi definido.");
        }
        return this.tableTime;
    }

    public getAttendedTime(): number {
        if (!this.tableTime) {
            throw new Error("O momento que leva para o estudante ser atendido não foi definido.");
        }
        return this.attendedTime;
    }
}