import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Play, Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Simulation } from "@/domain/data-management/Entities/simulation";

const SimulationList = ({
  simulations,
  runningSimulations,
  handleRunSimulation,
  navigate,
  confirmEdit,
  confirmDelete,
}) => {
  return (
    <div className="grid gap-4">
      {simulations.map((simulation) => (
        <Card key={simulation.id} className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{simulation.name}</h2>
              <div className="text-sm text-gray-500">
                <p>Limite Fila Interna (LFI): {simulation.parameters.internalQueueLimit}</p>
                <p>Limite Mesas (LM): {simulation.parameters.tableLimit}</p>
                <p>Tempo Médio Registro (TMDM): {simulation.parameters.registrationTime}s</p>
                <p>Tempo Médio Serviço (TMPSC): {simulation.parameters.servingTime}s</p>
                <p>Tempo Médio Mesa (TMPNM): {simulation.parameters.tableTime}s</p>
                <p>Limite Catraca (QAL): {simulation.parameters.turnstileLimit}</p>
                <p>Quantidade Alunos (QACR): {simulation.parameters.studentCount}</p>
                <p>Intervalo Chegadas (IAR): {simulation.parameters.serviceInterval}s</p>
                <p>Distribuição Chegada: {simulation.parameters.arrivalDistribution}</p>
              </div>
            </div>

            {runningSimulations[simulation.id!] !== undefined && (
              <div className="w-full md:w-1/3">
                <Progress value={runningSimulations[simulation.id!]} className="h-2" />
                <p className="text-sm text-center mt-1">{runningSimulations[simulation.id!]}%</p>
              </div>
            )}

            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Button
                variant="outline"
                onClick={() => handleRunSimulation(simulation)}
                disabled={runningSimulations[simulation.id!] !== undefined}
              >
                <Play className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/results/${simulation.id}`)}
                disabled={!simulation.results}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => confirmEdit(simulation)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => confirmDelete(simulation)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SimulationList;
