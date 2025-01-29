import { Simulation } from "@/domain/data-management/Entities/simulation";

/**
 * Interface para o adaptador de gerenciamento de simulações.
 * Define os métodos necessários para criar, atualizar, deletar e obter simulações.
 */
export interface SimulationManagementAdapterI {
  /**
   * Cria uma nova simulação.
   * @param simulation - A simulação a ser criada.
   * @returns Uma promessa que resolve para a simulação criada ou undefined em caso de falha.
   */
  createSimulation(simulation: Simulation): Promise<Simulation | undefined>;

  /**
   * Atualiza uma simulação existente.
   * @param simulation - A simulação a ser atualizada.
   * @returns Uma promessa que resolve para a simulação atualizada ou undefined em caso de falha.
   */
  updateSimulation(simulation: Simulation): Promise<Simulation | undefined>;

  /**
   * Deleta uma simulação pelo ID.
   * @param id - O ID da simulação a ser deletada.
   * @returns Uma promessa que resolve para true se a simulação foi deletada com sucesso, ou false em caso de falha.
   */
  deleteSimulation(id: string): Promise<boolean>;

  /**
   * Obtém todas as simulações.
   * @returns Uma promessa que resolve para uma lista de todas as simulações.
   */
  getAllSimulations(): Promise<Simulation[]>;

  /**
   * Obtém uma simulação pelo ID.
   * @param id - O ID da simulação a ser obtida.
   * @returns Uma promessa que resolve para a simulação obtida ou undefined se não for encontrada.
   */
  getSimulation(id: string): Promise<Simulation | undefined>;
}