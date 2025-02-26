import { SimulationRepositoryI } from "@/adapter/interfaces/simulation-repository-interface";
import { Simulation } from "./Entities/simulation";

/**
 * @class SimulationRepository
 * @implements {SimulationRepositoryI}
 * @description Repositório para gerenciar operações de persistência de simulações usando localStorage.
 */
export class SimulationRepository implements SimulationRepositoryI {

  /**
   * @private
   * @property storagePrefix
   * @type {string}
   * @description Prefixo usado para as chaves de armazenamento no localStorage.
   */
  private storagePrefix = "simulation_";

  /**
   * @private
   * @method getStorageKey
   * @param {string} id - O ID da simulação.
   * @returns {string} - A chave completa para armazenamento no localStorage.
   * @description Gera a chave de armazenamento para uma simulação com base em seu ID.
   */
  private getStorageKey(id: string): string {
    return `${this.storagePrefix}${id}`;
  }

  /**
   * @public
   * @async
   * @method save
   * @param {Simulation} simulation - A simulação a ser salva.
   * @returns {Promise<void>} - Uma promessa que resolve quando a simulação é salva.
   * @description Salva uma simulação no localStorage. Se a simulação já tiver um ID, ela é deletada antes de ser salva novamente com um novo ID.
   */
  async save(simulation: Simulation): Promise<void> {
    if (simulation.id) {
      this.delete(simulation.id);
    }
    simulation.id = crypto.randomUUID();
    localStorage.setItem(this.getStorageKey(simulation.id), JSON.stringify(simulation));
  }

  /**
   * @public
   * @async
   * @method getById
   * @param {string} id - O ID da simulação a ser recuperada.
   * @returns {Promise<Simulation | null>} - Uma promessa que resolve com a simulação recuperada ou null se não encontrada.
   * @description Recupera uma simulação do localStorage pelo seu ID.
   */
  async getById(id: string): Promise<Simulation | null> {
    let data = localStorage.getItem(this.getStorageKey(id));
    return data ? JSON.parse(data) : null;
  }

  /**
   * @public
   * @async
   * @method getAll
   * @returns {Promise<Simulation[]>} - Uma promessa que resolve com um array de todas as simulações armazenadas.
   * @description Recupera todas as simulações armazenadas no localStorage.
   */
  async getAll(): Promise<Simulation[]> {
    let simulations: Simulation[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key && key.startsWith(this.storagePrefix)) {
        let data = localStorage.getItem(key);
        if (data) {
          simulations.push(JSON.parse(data));
        }
      }
    }
    return simulations;
  }

  /**
   * @public
   * @async
   * @method delete
   * @param {string} id - O ID da simulação a ser deletada.
   * @returns {Promise<void>} - Uma promessa que resolve quando a simulação é deletada.
   * @description Deleta uma simulação do localStorage pelo seu ID.
   */
  async delete(id: string): Promise<void> {
    localStorage.removeItem(this.getStorageKey(id));
  }
}