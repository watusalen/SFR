import { SimulatorI } from "@/adapter/interfaces/simulator-interface";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { Simulator } from "./simulator";


export class SystemSimulator implements SimulatorI {
    startSimulation(simulation: Simulation, onProgressUpdate: (progress: number) => void, onError: (error: Error) => void): () => void {
        const simulator: Simulator = new Simulator(simulation);
        simulator.startSimulation();
        onProgressUpdate(100);
        return () => { };
    }
}