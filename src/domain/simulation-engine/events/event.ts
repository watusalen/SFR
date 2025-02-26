import { Cafeteria } from "../system/cafeteria";
import { EventMachine } from "./event-machine";

/**
 * @class Event
 * @description Classe abstrata que representa um evento no sistema de simulação do refeitório.
 * Define a estrutura básica para eventos com um timestamp, referência à cafeteria e à máquina de eventos.
 */
export abstract class Event {
    /**
     * @protected
     * @property timestamp
     * @type {number}
     * @description O momento em que o evento ocorre.
     */
    protected timestamp: number;

    /**
     * @protected
     * @property cafeteria
     * @type {Cafeteria}
     * @description Referência à instância da cafeteria onde o evento ocorre.
     */
    protected cafeteria: Cafeteria;

    /**
     * @protected
     * @property machine
     * @type {EventMachine}
     * @description Referência à máquina de eventos que gerencia este evento.
     */
    protected machine: EventMachine;

    /**
     * @constructor
     * @param {number} timestamp - O momento em que o evento ocorre.
     * @param {Cafeteria} cafeteria - A instância da cafeteria onde o evento ocorre.
     * @param {EventMachine} machine - A máquina de eventos que gerencia este evento.
     * @description Inicializa uma nova instância da classe Event.
     */
    constructor(timestamp: number, cafeteria: Cafeteria, machine: EventMachine) {
        this.timestamp = timestamp;
        this.cafeteria = cafeteria;
        this.machine = machine;
    }

    /**
     * @public
     * @method getTimeStamp
     * @returns {number} - O timestamp do evento.
     * @description Retorna o momento em que o evento ocorre.
     */
    public getTimeStamp(): number {
        return this.timestamp;
    }

    /**
     * @public
     * @abstract
     * @method processEvent
     * @description Método abstrato que define a lógica de processamento do evento.
     * Deve ser implementado pelas subclasses para definir o comportamento específico do evento.
     */
    abstract processEvent(): void;
}