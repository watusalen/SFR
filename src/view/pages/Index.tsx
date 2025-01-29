import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { adapters } from "@/dependencies-injection";
import Header from "../components/Header";
import SimulationList from "../components/SimulationList";
import DeleteDialog from "../components/DeleteDialog";
import EditDialog from "../components/EditDialog";

/**
 * Componente principal da página de índice que exibe a lista de simulações.
 * @returns JSX.Element
 */
const Index = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSimulation, setSelectedSimulation] =
    useState<Simulation | null>(null);
  const [runningSimulations, setRunningSimulations] = useState<
    Record<string, number>
  >({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadSimulations();
  }, []);

  /**
   * Carrega todas as simulações disponíveis.
   */
  const loadSimulations = async () => {
    const loadedSimulations = await adapters.simManagement.getAllSimulations();
    setSimulations(loadedSimulations);
  };

  /**
   * Inicia a execução de uma simulação.
   * @param simulation A simulação a ser executada.
   * @returns Uma função para parar a simulação.
   */
  const handleRunSimulation = (simulation: Simulation) => {
    if (!simulation.id) return;

    const stopSimulation = adapters.simEngine.startSimulation(
      simulation,
      (progress) => {
        setRunningSimulations((prev) => ({
          ...prev,
          [simulation.id!]: progress,
        }));

        if (progress >= 100) {
          toast({
            title: "Simulação concluída",
            description: `A simulação "${simulation.name}" foi concluída com sucesso.`,
          });
          loadSimulations();
        }
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Erro na simulação",
          description: error.message,
        });
      }
    );

    return stopSimulation;
  };

  /**
   * Exclui uma simulação.
   * @param simulation A simulação a ser excluída.
   */
  const handleDeleteSimulation = async (simulation: Simulation) => {
    if (!simulation.id) return;

    const success = await adapters.simManagement.deleteSimulation(
      simulation.id
    );
    if (success) {
      toast({
        title: "Simulação excluída",
        description: `A simulação "${simulation.name}" foi excluída com sucesso.`,
      });
      loadSimulations();
    }
    setDeleteDialogOpen(false);
  };

  /**
   * Confirma a exclusão de uma simulação.
   * @param simulation A simulação a ser excluída.
   */
  const confirmDelete = (simulation: Simulation) => {
    setSelectedSimulation(simulation);
    setDeleteDialogOpen(true);
  };

  /**
   * Confirma a edição de uma simulação.
   * @param simulation A simulação a ser editada.
   */
  const confirmEdit = (simulation: Simulation) => {
    setSelectedSimulation(simulation);
    setEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header navigate={navigate} />
      <SimulationList
        simulations={simulations}
        runningSimulations={runningSimulations}
        handleRunSimulation={handleRunSimulation}
        navigate={navigate}
        confirmEdit={confirmEdit}
        confirmDelete={confirmDelete}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        selectedSimulation={selectedSimulation}
        handleDeleteSimulation={handleDeleteSimulation}
      />
      <EditDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        selectedSimulation={selectedSimulation}
        navigate={navigate}
      />
    </div>
  );
};

export default Index;
