import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Simulation } from "@/domain/data-management/Entities/simulation";
import { useNavigate } from "react-router-dom";

const EditDialog = ({ open, setOpen, selectedSimulation, navigate }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar edição</AlertDialogTitle>
          <AlertDialogDescription>
            Ao editar esta simulação, os resultados anteriores serão perdidos e será necessário executá-la novamente. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setOpen(false);
              if (selectedSimulation?.id) {
                navigate(`/edit/${selectedSimulation.id}`);
              }
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditDialog;
