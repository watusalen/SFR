import { MetricOverTime, SimulationResults } from "@/domain/data-management/Entities/simulation-results";
import { InternalQueue } from "../system/internal-queue";

/**
 * @class Observator
 * @description Coleta e calcula métricas durante a simulação do refeitório, armazenando dados sobre filas, ocupação de mesas e tempos de espera.
 */
export class Observator {
    /**
     * @property internalQueueSizeOverTime
     * @type {MetricOverTime[]}
     * @description Array de métricas que representam o tamanho da fila interna ao longo do tempo.
     */
    internalQueueSizeOverTime: MetricOverTime[];

    /**
     * @property externalQueueSizeOverTime
     * @type {MetricOverTime[]}
     * @description Array de métricas que representam o tamanho da fila externa ao longo do tempo.
     */
    externalQueueSizeOverTime: MetricOverTime[];

    /**
     * @property tableOccupancyOverTime
     * @type {MetricOverTime[]}
     * @description Array de métricas que representam a ocupação das mesas ao longo do tempo.
     */
    tableOccupancyOverTime: MetricOverTime[];

    /**
     * @property averageWaitTime
     * @type {number}
     * @description Tempo médio de espera dos estudantes no refeitório.
     */
    averageWaitTime: number;

    /**
     * @property avgExternalQueue
     * @type {number}
     * @description Tamanho médio da fila externa.
     */
    avgExternalQueue: number;

    /**
     * @property avgInternalQueue
     * @type {number}
     * @description Tamanho médio da fila interna.
     */
    avgInternalQueue: number;

    /**
     * @property maxTableOccupancy
     * @type {number}
     * @description Ocupação máxima das mesas durante a simulação.
     */
    maxTableOccupancy: number;

    /**
     * @property simulationDuration
     * @type {number}
     * @description Duração da simulação em tempo simulado.
     */
    simulationDuration: number;

    /**
     * @property simulationDurationReal
     * @type {number}
     * @description Duração real da simulação em milissegundos.
     */
    simulationDurationReal: number;

    /**
     * @property sumAverageWaitTime
     * @type {number}
     * @description Soma dos tempos de espera dos estudantes.
     */
    sumAverageWaitTime: number;

    /**
     * @property numberOfStudentsServed
     * @type {number}
     * @description Número de estudantes atendidos durante a simulação.
     */
    numberOfStudentsServed: number;

    /**
     * @property sumAverageExternalQueue
     * @type {number}
     * @description Soma dos tamanhos da fila externa.
     */
    sumAverageExternalQueue: number;

    /**
     * @property sumAverageInternalQueue
     * @type {number}
     * @description Soma dos tamanhos da fila interna.
     */
    sumAverageInternalQueue: number;

    /**
     * @property externalQueueObservations
     * @type {number}
     * @description Número de observações da fila externa.
     */
    externalQueueObservations: number;

    /**
     * @property internalQueueObservations
     * @type {number}
     * @description Número de observações da fila interna.
     */
    internalQueueObservations: number;

    /**
     * @property simulationEndTime
     * @type {number}
     * @description Tempo de término da simulação em tempo simulado.
     */
    simulationEndTime: number;

    /**
     * @property simulationStartTime
     * @type {number}
     * @description Tempo de início da simulação em tempo simulado.
     */
    simulationStartTime: number;

    /**
     * @property realEndTime
     * @type {number}
     * @description Tempo de término da simulação em tempo real (milissegundos).
     */
    realEndTime: number;

    /**
     * @property realStartTime
     * @type {number}
     * @description Tempo de início da simulação em tempo real (milissegundos).
     */
    realStartTime: number;

    /**
     * @constructor
     * @description Inicializa uma nova instância do Observator com valores padrão.
     */
    constructor() {
        this.internalQueueSizeOverTime = [];
        this.externalQueueSizeOverTime = [];
        this.tableOccupancyOverTime = [];
        this.averageWaitTime = 0;
        this.avgExternalQueue = 0;
        this.avgInternalQueue = 0;
        this.maxTableOccupancy = 0;
        this.simulationDuration = 0;
        this.simulationDurationReal = 0;

        this.sumAverageWaitTime = 0;
        this.numberOfStudentsServed = 0;
        this.sumAverageExternalQueue = 0;
        this.sumAverageInternalQueue = 0;
        this.externalQueueObservations = 0;
        this.internalQueueObservations = 0;
        this.simulationEndTime = 0;
        this.realStartTime = 0;
        this.realEndTime = 0;
        console.log(`Tempo real de quando começou: ${this.realStartTime}`);
    }

    /**
     * @public
     * @method observeWaitingTime
     * @param {number} intervalTime - Tempo de espera de um estudante.
     * @description Atualiza a soma dos tempos de espera.
     */
    public observeWaitingTime(intervalTime: number): void {
        this.sumAverageWaitTime += intervalTime;
    }

    /**
     * @public
     * @method observeStudentAttended
     * @description Incrementa o número de estudantes atendidos.
     */
    public observeStudentAttended(): void {
        this.numberOfStudentsServed++;
    }

    /**
     * @public
     * @method observerExternalQueueSize
     * @param {number} timestamp - Tempo da observação.
     * @param {number} queueSize - Tamanho da fila externa no momento da observação.
     * @description Registra o tamanho da fila externa ao longo do tempo.
     */
    public observerExternalQueueSize(timestamp: number, queueSize: number): void {
        this.externalQueueSizeOverTime.push(new MetricOverTime(timestamp, queueSize));
    }

    /**
     * @public
     * @method observerInternalQueueSize
     * @param {number} timestamp - Tempo da observação.
     * @param {number} queueSize - Tamanho da fila interna no momento da observação.
     * @description Registra o tamanho da fila interna ao longo do tempo.
     */
    public observerInternalQueueSize(timestamp: number, queueSize: number): void {
        this.internalQueueSizeOverTime.push(new MetricOverTime(timestamp, queueSize));
    }

    /**
     * @public
     * @method observeTableOccupancy
     * @param {number} occupancy - Número de mesas ocupadas.
     * @param {number} timestamp - Tempo da observação.
     * @description Registra a ocupação das mesas ao longo do tempo e atualiza a ocupação máxima.
     */
    public observeTableOccupancy(timestamp: number, occupancy: number): void {
        this.tableOccupancyOverTime.push(new MetricOverTime(timestamp, occupancy));
    }

    public observeMaxTableOcuppancy(occupancy: number) {
        if (occupancy > this.maxTableOccupancy) {
            this.maxTableOccupancy = occupancy;
        }
    }

    public computeResults(): SimulationResults {
        let simulationDurationRealInMiliseconds: number = this.realEndTime - this.realStartTime;
        this.simulationDurationReal = simulationDurationRealInMiliseconds / 1000;

        for (let i = 0; i < this.internalQueueSizeOverTime.length; i++) {
            this.sumAverageInternalQueue += this.internalQueueSizeOverTime[i].value;
        }
        this.sumAverageInternalQueue = this.sumAverageInternalQueue / this.internalQueueSizeOverTime.length;
        this.avgInternalQueue = this.sumAverageInternalQueue;
        console.log(`MÉDIO FILA INTERNA: ${this.avgInternalQueue}`);

        for (let i = 0; i < this.externalQueueSizeOverTime.length; i++) {
            this.sumAverageExternalQueue += this.externalQueueSizeOverTime[i].value;
        }
        this.sumAverageExternalQueue = this.sumAverageExternalQueue / this.externalQueueSizeOverTime.length;
        this.avgExternalQueue = this.sumAverageExternalQueue;
        console.log(`MÉDIO FILA EXTERNA: ${this.avgExternalQueue}`);

        this.sumAverageWaitTime = this.sumAverageWaitTime / this.numberOfStudentsServed;
        this.averageWaitTime = this.sumAverageWaitTime;
        console.log(`TEMPO MÉDIO DE ESPERA: ${this.averageWaitTime}`);
        console.log(this.internalQueueSizeOverTime);

        return new SimulationResults(this.internalQueueSizeOverTime,
            this.externalQueueSizeOverTime,
            this.tableOccupancyOverTime,
            this.averageWaitTime,
            this.avgExternalQueue,
            this.avgInternalQueue,
            this.maxTableOccupancy,
            this.simulationDuration,
            this.simulationDurationReal
        );
    }
}