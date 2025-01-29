import { Simulation } from "@/domain/data-management/Entities/simulation";
import { SimulatorI } from "./interfaces/simulator-interface";
import { SimulationEngineAdapterI } from "@/view/interfaces/simulation-engine-adapter-interface";
import { SimulationManagementAdapterI } from "@/view/interfaces/simulation-management-adapter-interface";

/**
 * Adapter para o motor de simulação.
 * Implementa a interface SimulationEngineAdapterI.
 */
export class SimulationEngineAdapter implements SimulationEngineAdapterI {
  private simulator: SimulatorI;
  private simulationManagement: SimulationManagementAdapterI;

  /**
   * Construtor da classe SimulationEngineAdapter.
   * @param simulator - Instância do simulador.
   * @param simulationManagement - Instância do gerenciador de simulação.
   */
  constructor(simulator: SimulatorI, simulationManagement: SimulationManagementAdapterI) {
    this.simulator = simulator;
    this.simulationManagement = simulationManagement;
  }

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
  ): () => void {
    simulation.results = null;
    simulation.status = "running";
    simulation.completedAt = null;
    //this.simulationManagement.updateSimulation(simulation);

    return this.simulator.startSimulation(simulation, (progress) => {
      if (progress >= 100) {
        this.simulationManagement.updateSimulation(simulation).then((updatedSimulation) => {
          onProgressUpdate(100);
        }).catch((error) => {
          onError(error);
        });
      } else {
        onProgressUpdate(progress);
      }
    }, onError);
  }
}