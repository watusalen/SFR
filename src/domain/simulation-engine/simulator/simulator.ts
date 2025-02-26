import { Simulation } from "@/domain/data-management/Entities/simulation";
import { EventMachine } from "../events/event-machine";
import { Cafeteria } from "../system/cafeteria";
import { Student } from "../system/student";
import { ExponentialRandom, GaussianRandom, RandomGeneratorI, UniformRandom } from "../util/random-generators";
import { StudentArrival } from "../events/student-arrival";
import { ObserveInternalQueue } from "../events/observe-internal-queue";
import { ObserveExternalQueue } from "../events/observe-external-queue";
import { ObserveTable } from "../events/observe-table";
import { SimulationResults } from "@/domain/data-management/Entities/simulation-results";

/**
 * @class Simulator
 * @description Gerencia a simulação do fluxo de alunos no refeitório, configurando eventos,
 * inicializando a cafeteria e a máquina de eventos, e processando a simulação.
 */
export class Simulator {
    /**
     * @private
     * @property cafeteria
     * @type {Cafeteria}
     * @description Instância da cafeteria que representa o ambiente de simulação.
     */
    private cafeteria: Cafeteria;

    /**
     * @private
     * @property machine
     * @type {EventMachine}
     * @description Máquina de eventos que gerencia a ordem e o processamento dos eventos.
     */
    private machine: EventMachine;

    /**
     * @private
     * @property simulation
     * @type {Simulation}
     * @description Objeto de simulação que contém os parâmetros e resultados da simulação.
     */
    private simulation: Simulation;

    /**
     * @constructor
     * @param {Simulation} simulation - Objeto de simulação com os parâmetros da simulação.
     * @description Inicializa uma nova instância do Simulator, configurando a cafeteria,
     * a máquina de eventos e os eventos de chegada de alunos e observação.
     */
    constructor(simulation: Simulation) {
        this.simulation = simulation;
        this.cafeteria = new Cafeteria(
            this.simulation.parameters.internalQueueLimit,
            this.simulation.parameters.turnstileLimit,
            this.simulation.parameters.tableLimit
        );
        this.machine = new EventMachine();
        this.setUpStudentsArrival();
        this.configureExternalQueueObservation();
        this.configureInternalQueueObservation();
        this.configureTableOcupancyObservation();
    }

    /**
     * @private
     * @method configureExternalQueueObservation
     * @description Configura os eventos de observação da fila externa em intervalos regulares.
     */
    private configureExternalQueueObservation() {
        let intervalBetweenObservations : number = this.simulation.parameters.serviceInterval;
        intervalBetweenObservations = intervalBetweenObservations / 20;
        const quantityOfObservations: number = this.simulation.parameters.serviceInterval / intervalBetweenObservations;
        for (let i = 0; i < quantityOfObservations; i++) {
            const instantObservation = (i + 1) * intervalBetweenObservations;
            const eventObservation = new ObserveExternalQueue(instantObservation, this.cafeteria, this.machine);
            this.machine.addEvent(eventObservation);
        }
    }

    /**
     * @private
     * @method configureInternalQueueObservation
     * @description Configura os eventos de observação da fila interna em intervalos regulares.
     */
    private configureInternalQueueObservation() {
        let intervalBetweenObservations : number = this.simulation.parameters.serviceInterval;
        intervalBetweenObservations = intervalBetweenObservations / 20;
        const quantityOfObservations: number = this.simulation.parameters.serviceInterval / intervalBetweenObservations;
        for (let i = 0; i < quantityOfObservations; i++) {
            const instantObservation = (i + 1) * intervalBetweenObservations;
            const eventObservation = new ObserveInternalQueue(instantObservation, this.cafeteria, this.machine);
            this.machine.addEvent(eventObservation);
        }
    }

    /**
     * @private
     * @method configureTableOcupancyObservation
     * @description Configura os eventos de observação da ocupação das mesas em intervalos regulares.
     */
    private configureTableOcupancyObservation() {
        let intervalBetweenObservations : number = this.simulation.parameters.serviceInterval;
        intervalBetweenObservations = intervalBetweenObservations / 20;
        const quantityOfObservations: number = this.simulation.parameters.serviceInterval / intervalBetweenObservations;
        for (let i = 0; i < quantityOfObservations; i++) {
            const instantObservation = (i + 1) * intervalBetweenObservations;
            const eventObservation = new ObserveTable(instantObservation, this.cafeteria, this.machine);
            this.machine.addEvent(eventObservation);
        }
    }

    /**
     * @private
     * @method setUpStudentsArrival
     * @description Configura a chegada dos estudantes com base na distribuição de chegada especificada.
     */
    private setUpStudentsArrival(): void {
        let randomNumberGenerator: RandomGeneratorI;

        switch (this.simulation.parameters.arrivalDistribution) {
            case "normal":
                randomNumberGenerator = new GaussianRandom();
                break;
            case "uniform":
                randomNumberGenerator = new UniformRandom();
                break;
            case "exp":
                randomNumberGenerator = new ExponentialRandom();
                break;
            default:
                randomNumberGenerator = new UniformRandom();
                break;
        }

        for (let i = 0; i < this.simulation.parameters.studentCount; i++) {
            const registrationTime: number = randomNumberGenerator.next() * 2 * this.simulation.parameters.registrationTime;
            const tableTime: number = randomNumberGenerator.next() * 2 * this.simulation.parameters.tableTime;
            const attendedTime: number = randomNumberGenerator.next() * 2 * this.simulation.parameters.servingTime;
            const student = new Student(registrationTime, tableTime, attendedTime);
            const timestamp: number = randomNumberGenerator.next() * this.simulation.parameters.serviceInterval;
            const arrival = new StudentArrival(timestamp, this.cafeteria, this.machine, student);
            this.machine.addEvent(arrival);
        }
    }

    /**
     * @public
     * @method startSimulation
     * @description Inicia a simulação, processa os eventos e computa os resultados.
     */
    public startSimulation() {
        console.log(`Simulação iniciada.`);
        this.machine.processEvents();
        const results: SimulationResults = this.machine.getObservator().computeResults();
        results.simulationDuration = Math.floor(this.machine.getSimulationTime() * 100) / 100;
        this.simulation.results = results;
        console.log(`Simulação finalizada. Tempo real: ${this.simulation.results.simulationDurationReal}`);
        console.log(results);
    }

    /**
     * @public
     * @method getSimulation
     * @returns {Simulation} - O objeto de simulação com os resultados.
     * @description Retorna o objeto de simulação que contém os parâmetros e resultados da simulação.
     */
    public getSimulation(): Simulation {
        return this.simulation;
    }
}