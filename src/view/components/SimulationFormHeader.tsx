
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Header component for the SimulationForm.
 * @param {Object} props - Component props.
 * @param {string} props.id - Simulation ID.
 * @param {Function} props.navigate - Navigation function.
 */
const SimulationFormHeader = ({ id, navigate }) => {
  return (
    <div className="flex items-center mb-8">
      <Button
        onClick={() => navigate("/")}
        variant="outline"
        className="mr-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      <h1 className="text-3xl font-bold">
        {id ? "Editar Simulação" : "Nova Simulação"}
      </h1>
    </div>
  );
};

export default SimulationFormHeader;