import { SimulationParameters } from "./simulation-parameters";
import { SimulationResults } from "./simulation-results";

/**
 * Represents a simulation with its parameters and results.
 */
export class Simulation {
  /**
   * Unique identifier for the simulation.
   */
  id: string;

  /**
   * Name of the simulation.
   */
  name: string;

  /**
   * Current status of the simulation.
   */
  status: "not_started" | "running" | "completed";

  /**
   * Timestamp when the simulation was completed.
   */
  completedAt?: string;

  /**
   * Parameters used for the simulation.
   */
  parameters: SimulationParameters;

  /**
   * Results of the simulation.
   */
  results?: SimulationResults;

  /**
   * Creates a new Simulation instance.
   * @param id - Unique identifier for the simulation.
   * @param name - Name of the simulation.
   * @param parameters - Parameters used for the simulation.
   */
  constructor(id: string, name: string, parameters: SimulationParameters) {
    this.id = id;
    this.name = name;
    this.status = "not_started";
    this.parameters = parameters;
  }
}

