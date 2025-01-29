import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulationRepositoryI } from "./interfaces/simulation-repository-interface";
import { SimulationManagementAdapterI } from "@/view/interfaces/simulation-management-adapter-interface";

export class SimulationManagementAdapter implements SimulationManagementAdapterI {
  private simulationRepository: SimulationRepositoryI;

  constructor(simulationRepository: SimulationRepositoryI) {
    this.simulationRepository = simulationRepository;
  }

  /**
   * Cria uma nova simulação.
   * @param simulation - A simulação a ser criada.
   * @returns Uma promessa que resolve para a simulação criada ou undefined em caso de falha.
   */
  async createSimulation(simulation: Simulation): Promise<Simulation | undefined> {

    await this.simulationRepository.save(simulation);
    return simulation;
  }

  /**
   * Atualiza uma simulação existente.
   * @param simulation - A simulação a ser atualizada.
   * @returns Uma promessa que resolve para a simulação atualizada ou undefined em caso de falha.
   */
  async updateSimulation(simulation: Simulation): Promise<Simulation | undefined> {
    const existing = this.simulationRepository.getById(simulation.id);
    if (!existing) {
      throw new Error("Simulation not found");
    }

    const updated = { ...existing, ...simulation };
    await this.simulationRepository.save(updated);
    return simulation;
  }

  /**
   * Deleta uma simulação pelo ID.
   * @param id - O ID da simulação a ser deletada.
   * @returns Uma promessa que resolve para true se a simulação foi deletada com sucesso, ou false em caso de falha.
   */
  async deleteSimulation(id: string): Promise<boolean> {
    try {
      this.simulationRepository.delete(id);
      return true;
    } catch (e) {
      return false;
    }

  }

  /**
   * Obtém todas as simulações.
   * @returns Uma promessa que resolve para uma lista de todas as simulações.
   */
  getAllSimulations(): Promise<Simulation[]> {
    return this.simulationRepository.getAll();
  }

  /**
  * Obtém uma simulação pelo ID.
  * @param id - O ID da simulação a ser obtida.
  * @returns Uma promessa que resolve para a simulação obtida ou undefined se não for encontrada.
  */
  async getSimulation(id: string): Promise<Simulation | undefined> {
    const sim = await this.simulationRepository.getById(id);
    if (sim) {
      return sim;
    } else {
      return undefined;
    }
  }
}