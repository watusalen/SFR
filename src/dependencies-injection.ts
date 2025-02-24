import { SimulationRepositoryI } from "./adapter/interfaces/simulation-repository-interface";
import { SimulatorI } from "./adapter/interfaces/simulator-interface";
import { SimulationEngineAdapter } from "./adapter/simulation-engine-adapter";
import { SimulationManagementAdapter } from "./adapter/simulation-management-adapter";
import { SimulationRepository } from "./domain/data-management/simulation-repository";
import { MockSimulator } from "./domain/simulation-engine/mock-simulator";
import { SimulationEngineAdapterI } from "./view/interfaces/simulation-engine-adapter-interface";
import { SimulationManagementAdapterI } from "./view/interfaces/simulation-management-adapter-interface";

//injeção de dependências
console.log("Injeção de dependências");
const repository : SimulationRepositoryI = new SimulationRepository();
const simulator : SimulatorI = new MockSimulator();
const management : SimulationManagementAdapterI = new SimulationManagementAdapter(repository);
const engine : SimulationEngineAdapterI = new SimulationEngineAdapter(simulator,management);

//exportando os adapters para que as views consigam fazer as operações.
export const adapters = {
  simManagement: management,
  simEngine: engine,
};