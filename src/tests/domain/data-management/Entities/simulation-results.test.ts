import { SimulationResults, MetricOverTime } from "@/domain/data-management/Entities/simulation-results";

describe("SimulationResults", () => {
  it("should create a new SimulationResults instance", () => {
    const internalQueue = [new MetricOverTime(0, 10)];
    const externalQueue = [new MetricOverTime(0, 5)];
    const tableOccupancy = [new MetricOverTime(0, 100)];
    const results = new SimulationResults(internalQueue, externalQueue, tableOccupancy, 5, 10, 7, 100, 60000);

    expect(results.intertalQueueSizeOverTime).toBe(internalQueue);
    expect(results.externalQueueSizeOverTime).toBe(externalQueue);
    expect(results.tableOccupancyOverTime).toBe(tableOccupancy);
    expect(results.averageWaitTime).toBe(5);
    expect(results.avgExternalQueue).toBe(10);
    expect(results.avgWaitTime).toBe(7);
    expect(results.maxTableOccupancy).toBe(100);
    expect(results.simulationDuration).toBe(60000);
  });
});
