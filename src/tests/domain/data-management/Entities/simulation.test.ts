import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";

describe("Simulation", () => {
  it("should create a new simulation with default status", () => {
    const parameters = new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal");
    const simulation = new Simulation("1", "Test Simulation", parameters);

    expect(simulation.id).toBe("1");
    expect(simulation.name).toBe("Test Simulation");
    expect(simulation.status).toBe("not_started");
    expect(simulation.parameters).toBe(parameters);
  });
});
