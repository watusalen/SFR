import { MockSimulator } from "@/domain/simulation-engine/mock-simulator";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";

describe("MockSimulator", () => {
  let simulator: MockSimulator;
  let simulation: Simulation;

  beforeEach(() => {
    simulator = new MockSimulator();
    simulation = new Simulation("1", "Test Simulation", new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal"));
  });

  it("should start and complete the simulation", (done) => {
    const onProgressUpdate = jest.fn();
    const onError = jest.fn();

    const cancel = simulator.startSimulation(simulation, onProgressUpdate, onError);

    setTimeout(() => {
      expect(onProgressUpdate).toHaveBeenCalledWith(10);
      cancel();
      done();
    }, 1100);
  });
});
