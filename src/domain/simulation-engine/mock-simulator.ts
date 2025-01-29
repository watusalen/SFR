import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { Simulation } from "../data-management/Entities/simulation";
import { MetricOverTime, SimulationResults } from "../data-management/Entities/simulation-results";

/**
 * Classe de simulação fictícia para testes. Este simulador gera resultados aleatórios.
 */
export class MockSimulator implements SimulatorI {
  private intervalId?: number;
  private currentProgress = 0;

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
    this.currentProgress = 0;
    
    // Simulação de progresso com intervalo de 1 segundo
    this.intervalId = window.setInterval(() => {
      try {
        this.currentProgress += 10;
        
        

        // Completa a simulação quando chegar a 100%
        if (this.currentProgress >= 100) {
          simulation.status = "completed";
          simulation.completedAt = new Date().toISOString();
          this.completeSimulation(simulation);
          this.clearInterval();
        }
        // Atualiza progresso
        onProgressUpdate(Math.min(this.currentProgress, 100));
      } catch (error) {
        this.clearInterval();
        onError(error instanceof Error ? error : new Error("Simulation failed"));
      }
    }, 1000);

    return this.cancelSimulation.bind(this);
  }

  /**
   * Completa a simulação e gera resultados fictícios.
   * @param simulation - A simulação a ser completada.
   */
  private completeSimulation(simulation: Simulation): void {
    simulation.status = "completed";
    simulation.completedAt = new Date().toISOString();
    simulation.results = this.generateFakeResults();
    console.log("Simulation completed", simulation);
  }

  /**
   * Gera resultados fictícios para a simulação.
   * @returns Resultados fictícios da simulação.
   */
  private generateFakeResults(): SimulationResults {
    const duration = 60000; // 1 minuto em ms
    return new SimulationResults(
      this.generateMetricData(duration, 0, 20),  // Fila interna
      this.generateMetricData(duration, 5, 15),  // Fila externa
      this.generateMetricData(duration, 0, 100), // Ocupação das mesas
      this.randomBetween(2, 10),                 // Tempo médio de espera
      this.randomBetween(5, 15),                 // Média fila externa
      this.randomBetween(5, 15),                // Média fila interna
      100,                                       // Ocupação máxima
      duration,                                  // Duração da simulação,
      duration
    );
  }

  /**
   * Gera dados métricos fictícios ao longo do tempo.
   * @param duration - Duração da simulação em milissegundos.
   * @param min - Valor mínimo da métrica.
   * @param max - Valor máximo da métrica.
   * @returns Uma lista de métricas ao longo do tempo.
   */
  private generateMetricData(
    duration: number,
    min: number,
    max: number
  ): MetricOverTime[] {
    const data: MetricOverTime[] = [];
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
      data.push(new MetricOverTime((duration / steps) * i, this.randomBetween(min, max)));
    }
    return data;
  }

  /**
   * Gera um número aleatório entre min e max.
   * @param min - Valor mínimo.
   * @param max - Valor máximo.
   * @returns Um número aleatório entre min e max.
   */
  private randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Cancela a simulação em andamento.
   */
  private cancelSimulation(): void {
    this.clearInterval();
    this.currentProgress = 0;
  }

  /**
   * Limpa o intervalo da simulação.
   */
  private clearInterval(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}