import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";
import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";
import { adapters } from "@/dependencies-injection";
import SimulationFormHeader from "../components/SimulationFormHeader";
import SimulationFormFields from "../components/SimulationFormFields";
import { Simulation } from "@/domain/data-management/Entities/simulation";

const SimulationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    parameters: SimulationParameters;
  }>({
    name: "",
    parameters: {
      internalQueueLimit: 0,
      tableLimit: 0,
      registrationTime: 0,
      servingTime: 0,
      tableTime: 0,
      turnstileLimit: 0,
      studentCount: 0,
      serviceInterval: 0,
      arrivalDistribution: "normal"
    },
  });

  useEffect(() => {
    if (id) {
      loadSimulation();
    }
  }, [id]);

  const loadSimulation = async () => {
    const simulations = await adapters.simManagement.getAllSimulations();
    const simulation = simulations.find((s) => s.id === id);
    if (simulation) {
      setFormData({
        name: simulation.name,
        parameters: { ...simulation.parameters },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const simulationData = new Simulation(id,formData.name,formData.parameters);

      if (id) {
        simulationData.id = id;
        await adapters.simManagement.updateSimulation(simulationData);
        toast({
          title: "Simulação atualizada",
          description: "A simulação foi atualizada com sucesso.",
        });
      } else {
        await adapters.simManagement.createSimulation(simulationData);
        toast({
          title: "Simulação criada",
          description: "A simulação foi criada com sucesso.",
        });
      }

      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao salvar a simulação.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    isParameter = false
  ) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    if (isParameter) {
      setFormData((prev) => ({
        ...prev,
        parameters: {
          ...prev.parameters,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SimulationFormHeader id={id} navigate={navigate} />
      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <SimulationFormFields formData={formData} handleChange={handleChange} />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SimulationForm;
