/**
 * Represents the results of a simulation.
 */
export class SimulationResults {
  intertalQueueSizeOverTime: MetricOverTime[];
  externalQueueSizeOverTime: MetricOverTime[];
  tableOccupancyOverTime: MetricOverTime[];
  averageWaitTime: number;
  avgExternalQueue: number;
  avgInternalQueue: number;
  maxTableOccupancy: number;
  simulationDuration: number; //simulated time
  simulationDurationReal : number; //real time to simulate

  /**
   * Creates an instance of SimulationResults.
   * @param intertalQueueSizeOverTime - Array of internal queue size metrics over time.
   * @param externalQueueSizeOverTime - Array of external queue size metrics over time.
   * @param tableOccupancyOverTime - Array of table occupancy metrics over time.
   * @param averageWaitTime - The average wait time.
   * @param avgExternalQueue - The average external queue size.
   * @param avgInternalQueue - The average internal queue size.
   * @param maxTableOccupancy - The maximum table occupancy.
   * @param simulationDuration - The duration of the simulation (simulated time).
   * @param simulationDurationReal - The real time simulation duration.
   */
  constructor(
    intertalQueueSizeOverTime: MetricOverTime[],
    externalQueueSizeOverTime: MetricOverTime[],
    tableOccupancyOverTime: MetricOverTime[],
    averageWaitTime: number,
    avgExternalQueue: number,
    avgInternalQueue: number,
    maxTableOccupancy: number,
    simulationDuration: number,
    simulationDurationReal : number
  ) {
    this.intertalQueueSizeOverTime = intertalQueueSizeOverTime;
    this.externalQueueSizeOverTime = externalQueueSizeOverTime;
    this.tableOccupancyOverTime = tableOccupancyOverTime;
    this.averageWaitTime = this.validateNonNegative(averageWaitTime, 'averageWaitTime');
    this.avgExternalQueue = this.validateNonNegative(avgExternalQueue, 'avgExternalQueue');
    this.avgInternalQueue = this.validateNonNegative(avgInternalQueue, 'avgInternalQueue');
    this.maxTableOccupancy = this.validateNonNegative(maxTableOccupancy, 'maxTableOccupancy');
    this.simulationDuration = this.validateNonNegative(simulationDuration, 'simulationDuration');
    this.simulationDurationReal = this.validateNonNegative(simulationDurationReal, 'simulationDurantionReal');
  }

  private validateNonNegative(value: number, fieldName: string): number {
    if (typeof value !== 'number' || isNaN(value) || value < 0) {
      throw new Error(`Invalid value for ${fieldName}: must be a non-negative number`);
    }
    return value;
  }
}

/**
 * Represents a metric over time.
 */
export class MetricOverTime {
  timestamp: number;
  value: number;

  /**
   * Creates an instance of MetricOverTime.
   * @param timestamp - The timestamp of the metric.
   * @param value - The value of the metric.
   */
  constructor(timestamp: number, value: number) {
    this.timestamp = this.validateNonNegative(timestamp, 'timestamp');
    this.value = this.validateNonNegative(value, 'value');
  }

  private validateNonNegative(value: number, fieldName: string): number {
    if (typeof value !== 'number' || isNaN(value) || value < 0) {
      throw new Error(`Invalid value for ${fieldName}: must be a non-negative number`);
    }
    return value;
  }
}
