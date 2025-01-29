import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";
import { SimulationRepositoryMock } from "@/domain/data-management/simulation-repository";

describe("SimulationRepository", () => {
  let repository: SimulationRepositoryI;

  beforeEach(() => {
    repository = new SimulationRepositoryMock();
    localStorage.clear();
  });

  it("should save and retrieve a simulation", async () => {
    const simulation = new Simulation("1", "Test Simulation", new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal"));
    await repository.save(simulation);

    const retrieved = await repository.getById("1");
    expect(retrieved).toEqual(simulation);
  });

  it("should delete a simulation", async () => {
    const simulation = new Simulation("1", "Test Simulation", new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal"));
    await repository.save(simulation);
    await repository.delete("1");

    const retrieved = await repository.getById("1");
    expect(retrieved).toBeNull();
  });

  it("should retrieve all simulations", async () => {
    const simulation1 = new Simulation("1", "Test Simulation 1", new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal"));
    const simulation2 = new Simulation("2", "Test Simulation 2", new SimulationParameters(20, 20, 20, 20, 20, 20, 20, 20, "exp"));
    await repository.save(simulation1);
    await repository.save(simulation2);

    const simulations = await repository.getAll();
    expect(simulations).toEqual([simulation1, simulation2]);
  });
});
