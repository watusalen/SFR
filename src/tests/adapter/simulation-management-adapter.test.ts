import { SimulationManagementAdapterI } from "@/view/interfaces/simulation-management-adapter-interface";
import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";
import { SimulationManagementAdapter } from "@/adapter/simulation-management-adapter";

class MockSimulationRepository implements SimulationRepositoryI {
  async save(simulation: Simulation): Promise<void> {}
  async getById(id: string): Promise<Simulation | null> {
    return null;
  }
  async getAll(): Promise<Simulation[]> {
    return [];
  }
  async delete(id: string): Promise<void> {}
}

describe("SimulationManagementAdapter", () => {
  let repository: SimulationRepositoryI;
  let adapter: SimulationManagementAdapterI;
  let simulation: Simulation;

  beforeEach(() => {
    repository = new MockSimulationRepository();
    adapter = new SimulationManagementAdapter(repository);
    simulation = new Simulation("1", "Test Simulation", new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal"));
  });

  it("should create a new simulation", async () => {
    const result = await adapter.createSimulation(simulation);
    expect(result).toEqual(simulation);
  });

  it("should update an existing simulation", async () => {
    const result = await adapter.updateSimulation(simulation);
    expect(result).toEqual(simulation);
  });

  it("should delete a simulation", async () => {
    const result = await adapter.deleteSimulation("1");
    expect(result).toBe(true);
  });

  it("should get all simulations", async () => {
    const result = await adapter.getAllSimulations();
    expect(result).toEqual([]);
  });

  it("should get a simulation by ID", async () => {
    const result = await adapter.getSimulation("1");
    expect(result).toBeUndefined();
  });
});
