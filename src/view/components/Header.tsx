import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = ({ navigate }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Simulador de Fluxo do Refeitório - IFPI</h1>
      <Button onClick={() => navigate("/new")} className="bg-primary">
        <Plus className="mr-2 h-4 w-4" /> Nova Simulação
      </Button>
    </div>
  );
};

export default Header;
