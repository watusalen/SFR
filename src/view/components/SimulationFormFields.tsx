import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

/**
 * Fields component for the SimulationForm.
 * @param {Object} props - Component props.
 * @param {Object} props.formData - Form data.
 * @param {Function} props.handleChange - Change handler function.
 */
const SimulationFormFields = ({ formData, handleChange }) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Simulação</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Coluna 1 */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="internalQueueLimit">
              Limite Fila Interna (LFI)
            </Label>
            <Input
              id="internalQueueLimit"
              type="number"
              min="1"
              value={formData.parameters.internalQueueLimit}
              onChange={(e) => handleChange(e, "internalQueueLimit", true)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tableLimit">Limite Mesas (LM)</Label>
            <Input
              id="tableLimit"
              type="number"
              min="1"
              value={formData.parameters.tableLimit}
              onChange={(e) => handleChange(e, "tableLimit", true)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationTime">
              Tempo Médio Registro (TMDM) - segundos
            </Label>
            <Input
              id="registrationTime"
              type="number"
              min="1"
              step="0.1"
              value={formData.parameters.registrationTime}
              onChange={(e) => handleChange(e, "registrationTime", true)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servingTime">
              Tempo Médio Serviço (TMPSC) - segundos
            </Label>
            <Input
              id="servingTime"
              type="number"
              min="1"
              step="0.1"
              value={formData.parameters.servingTime}
              onChange={(e) => handleChange(e, "servingTime", true)}
              required
            />
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tableTime">
              Tempo Médio Mesa (TMPNM) - segundos
            </Label>
            <Input
              id="tableTime"
              type="number"
              min="1"
              step="0.1"
              value={formData.parameters.tableTime}
              onChange={(e) => handleChange(e, "tableTime", true)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="turnstileLimit">Limite Catraca (QAL)</Label>
            <Input
              id="turnstileLimit"
              type="number"
              min="1"
              value={formData.parameters.turnstileLimit}
              onChange={(e) => handleChange(e, "turnstileLimit", true)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentCount">Quantidade Alunos (QACR)</Label>
            <Input
              id="studentCount"
              type="number"
              min="1"
              value={formData.parameters.studentCount}
              onChange={(e) => handleChange(e, "studentCount", true)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceInterval">
              Intervalo Chegadas (IAR) - segundos
            </Label>
            <Input
              id="serviceInterval"
              type="number"
              min="1"
              step="0.1"
              value={formData.parameters.serviceInterval}
              onChange={(e) => handleChange(e, "serviceInterval", true)}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="arrivalDistribution">Distribuição de Chegada</Label>
        <select
          id="arrivalDistribution"
          value={formData.parameters.arrivalDistribution}
          onChange={(e) => handleChange(e, "arrivalDistribution", true)}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="normal">Normal</option>
          <option value="exp">Exponencial</option>
          <option value="uniform">Uniform</option>
        </select>
      </div>
    </>
  );
};

export default SimulationFormFields;
