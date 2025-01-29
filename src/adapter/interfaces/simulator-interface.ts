import { Simulation } from "@/domain/data-management/Entities/simulation";

/**
 * Interface para o simulador.
 * Define os métodos necessários para iniciar uma simulação.
 */
export interface SimulatorI {
  /**
   * Inicia uma simulação.
   * @param simulation - A simulação a ser iniciada.
   * @param onProgressUpdate - Callback para atualizar o progresso da simulação.
   * @param onError - Callback para tratar erros durante a simulação.
   * @returns Uma função para cancelar a simulação.
   */
  startSimulation(
    simulation: Simulation,
    onProgressUpdate: (progress: number) => void,
    onError: (error: Error) => void
  ): () => void;
}