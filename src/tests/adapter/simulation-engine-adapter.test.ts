import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";
import { SimulationEngineAdapter } from "@/adapter/simulation-engine-adapter";
import { SimulationManagementAdapterI } from "@/view/interfaces/simulation-management-adapter-interface";


class MockSimulator implements SimulatorI {
  startSimulation(
    simulation: Simulation,
    onProgressUpdate: (progress: number) => void,
    onError: (error: Error) => void
  ): () => void {
    onProgressUpdate(100);
    return () => {};
  }
}

class MockSimulationManagementAdapter implements SimulationManagementAdapterI {
  createSimulation(simulation: Simulation): Promise<Simulation | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteSimulation(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAllSimulations(): Promise<Simulation[]> {
    throw new Error("Method not implemented.");
  }
  getSimulation(id: string): Promise<Simulation | undefined> {
    throw new Error("Method not implemented.");
  }
  updateSimulation(simulation: Simulation): Promise<Simulation> {
    return Promise.resolve(simulation);
  }
}

describe("SimulationEngineAdapter", () => {
  let simulator: SimulatorI = new MockSimulator();
  const sma : SimulationManagementAdapterI = new MockSimulationManagementAdapter();
  let adapter: SimulationEngineAdapter;
  let simulation: Simulation;

  beforeEach(() => {
    simulator = new MockSimulator();
    adapter = new SimulationEngineAdapter(simulator,sma);
    simulation = new Simulation("1", "Test Simulation", new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal"));
  });

  it("should start the simulation and update progress", (done) => {
    const onProgressUpdate = jest.fn();
    const onError = jest.fn();

    const cancel = adapter.startSimulation(simulation, onProgressUpdate, onError);

    setTimeout(() => {
      expect(onProgressUpdate).toHaveBeenCalledWith(100);
      cancel();
      done();
    }, 100);
  });
});
