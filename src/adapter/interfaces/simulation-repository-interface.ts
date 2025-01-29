import { Simulation } from "@/domain/data-management/Entities/simulation";

/**
 * Interface para o repositório de simulações.
 * Define os métodos necessários para salvar, obter e deletar simulações.
 */
export interface SimulationRepositoryI {
  /**
   * Salva uma simulação.
   * @param simulation - A simulação a ser salva.
   * @returns Uma promessa que resolve quando a simulação for salva.
   */
  save(simulation: Simulation): Promise<void>;

  /**
   * Obtém uma simulação pelo ID.
   * @param id - O ID da simulação a ser obtida.
   * @returns Uma promessa que resolve para a simulação obtida ou null se não for encontrada.
   */
  getById(id: string): Promise<Simulation | null>;

  /**
   * Obtém todas as simulações.
   * @returns Uma promessa que resolve para uma lista de todas as simulações.
   */
  getAll(): Promise<Simulation[]>;

  /**
   * Deleta uma simulação pelo ID.
   * @param id - O ID da simulação a ser deletada.
   * @returns Uma promessa que resolve quando a simulação for deletada.
   */
  delete(id: string): Promise<void>;
}