import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import ChartCard from "../components/ChartCard";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { adapters } from "@/dependencies-injection";

/**
 * Results component fetches and displays the results of a simulation.
 * It shows general metrics and various charts based on the simulation data.
 */
const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  useEffect(() => {
    /**
     * Loads the simulation data based on the ID from the URL parameters.
     */
    const loadSimulation = async () => {
      const simulations = await adapters.simManagement.getAllSimulations();
      const found = simulations.find((s) => s.id === id);
      if (found) {
        setSimulation(found);
      }
    };
    loadSimulation();
  }, [id]);

  if (!simulation?.results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resultados não encontrados</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </div>
    );
  }

  const { results } = simulation;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button onClick={() => navigate("/")} variant="outline" className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <h1 className="text-3xl font-bold">Resultados da Simulação</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Métricas Gerais</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Tempo médio de espera:</span>{" "}
              {results.averageWaitTime.toFixed(2)}s
            </p>
            <p>
              <span className="font-medium">Fila externa média:</span>{" "}
              {results.avgExternalQueue.toFixed(2)} pessoas
            </p>
            <p>
              <span className="font-medium">Fila interna média:</span>{" "}
              {results.avgInternalQueue.toFixed(2)} pessoas
            </p>
            <p>
              <span className="font-medium">Ocupação máxima de mesas:</span>{" "}
              {results.maxTableOccupancy}
            </p>
            <p>
              <span className="font-medium">Tempo simulado:</span>{" "}
              {results.simulationDuration}s
            </p>
            <p>
              <span className="font-medium">Tempo real para simular:</span>{" "}
              {results.simulationDurationReal}s
            </p>
          </div>
        </Card>
      </div>

      <div className="space-y-8">
        <ChartCard
          title="Tamanho da Fila Interna ao Longo do Tempo"
          data={results.intertalQueueSizeOverTime}
          dataKey="value"
          yAxisLabel="Tamanho da Fila"
          lineColor="#8884d8"
        />
        <ChartCard
          title="Tamanho da Fila Externa ao Longo do Tempo"
          data={results.externalQueueSizeOverTime}
          dataKey="value"
          yAxisLabel="Tamanho da Fila"
          lineColor="#82ca9d"
        />
        <ChartCard
          title="Ocupação das Mesas ao Longo do Tempo"
          data={results.tableOccupancyOverTime}
          dataKey="value"
          yAxisLabel="Mesas Ocupadas"
          lineColor="#ffc658"
        />
      </div>
    </div>
  );
};

export default Results;