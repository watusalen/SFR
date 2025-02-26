/**
 * @class Student
 * @description Representa um aluno no sistema de simulação de fluxo de refeitório.
 * Armazena informações sobre o tempo de chegada, atendimento e outros tempos de processo.
 */
export class Student {
    /**
     * @private
     * @property arrivalMoment
     * @type {number | undefined}
     * @description O momento em que o aluno chega à fila externa.
     * Pode ser undefined se o aluno ainda não tiver chegado.
     */
    private arrivalMoment: number | undefined;

    /**
     * @private
     * @property serviceMoment
     * @type {number | undefined}
     * @description O momento em que o aluno começa a ser atendido na fila interna.
     * Pode ser undefined se o aluno ainda não tiver sido atendido.
     */
    private serviceMoment: number | undefined;

    /**
     * @private
     * @property registrationTime
     * @type {number}
     * @description O tempo que o aluno leva para digitar a matrícula na catraca.
     */
    private registrationTime: number;

    /**
     * @private
     * @property attendedTime
     * @type {number}
     * @description O tempo que o aluno leva para ser atendido na fila interna.
     */
    private attendedTime: number;

    /**
     * @private
     * @property tableTime
     * @type {number}
     * @description O tempo que o aluno leva para se alimentar na mesa.
     */
    private tableTime: number;

    /**
     * @constructor
     * @param {number} registrationTime - Tempo de registro do aluno.
     * @param {number} tableTime - Tempo de mesa do aluno.
     * @param {number} attendedTime - Tempo de atendimento do aluno.
     * @description Inicializa um novo objeto Student com os tempos fornecidos.
     */
    constructor(registrationTime: number, tableTime: number, attendedTime: number) {
        this.registrationTime = registrationTime;
        this.tableTime = tableTime;
        this.attendedTime = attendedTime;
    }

    /**
     * @public
     * @method setArrivalMoment
     * @param {number} arrivalMoment - O momento de chegada do aluno.
     * @description Define o momento de chegada do aluno.
     */
    public setArrivalMoment(arrivalMoment: number): void {
        this.arrivalMoment = arrivalMoment;
    }

    /**
     * @public
     * @method setServiceMoment
     * @param {number} serviceMoment - O momento de atendimento do aluno.
     * @description Define o momento de atendimento do aluno.
     */
    public setServiceMoment(serviceMoment: number): void {
        this.serviceMoment = serviceMoment;
    }

    /**
     * @public
     * @method getTimeToServe
     * @returns {number} - O tempo total que o aluno leva para ser atendido.
     * @description Calcula o tempo total que o aluno leva para ser atendido (tempo de atendimento menos tempo de chegada).
     * @throws {Error} - Lança um erro se os momentos de chegada ou atendimento não estiverem definidos.
     */
    public getTimeToServe(): number {
        if (!this.arrivalMoment || !this.serviceMoment) {
            throw new Error("Os momentos de chegada e atendimento devem ser definidos antes de calcular o tempo de atendimento.");
        }
        return this.serviceMoment - this.arrivalMoment;
    }

    /**
     * @public
     * @method getArrivalMoment
     * @returns {number} - O momento de chegada do aluno.
     * @description Retorna o momento de chegada do aluno.
     * @throws {Error} - Lança um erro se o momento de chegada não estiver definido.
     */
    public getArrivalMoment(): number {
        if (!this.arrivalMoment) {
            throw new Error("O momento de chegada do estudante não foi definido.");
        }
        return this.arrivalMoment;
    }

    /**
     * @public
     * @method getServiceMoment
     * @returns {number} - O momento de atendimento do aluno.
     * @description Retorna o momento de atendimento do aluno.
     * @throws {Error} - Lança um erro se o momento de atendimento não estiver definido.
     */
    public getServiceMoment(): number {
        if (!this.serviceMoment) {
            throw new Error("O momento de atendimento do estudante não foi definido.");
        }
        return this.serviceMoment;
    }

    /**
     * @public
     * @method getRegistrationTime
     * @returns {number} - O tempo de registro do aluno.
     * @description Retorna o tempo de registro do aluno.
     */
    public getRegistrationTime(): number {
        return this.registrationTime;
    }

    /**
     * @public
     * @method getTableTime
     * @returns {number} - O tempo de mesa do aluno.
     * @description Retorna o tempo de mesa do aluno.
     */
    public getTableTime(): number {
        return this.tableTime;
    }

    /**
     * @public
     * @method getAttendedTime
     * @returns {number} - O tempo de atendimento do aluno.
     * @description Retorna o tempo de atendimento do aluno.
     */
    public getAttendedTime(): number {
        return this.attendedTime;
    }
}
