export class SimulationParameters {
  internalQueueLimit: number; // LFI
  tableLimit: number; // LM
  registrationTime: number; // TMDM
  servingTime: number; // TMPSC
  tableTime: number; // TMPNM
  turnstileLimit: number; // QAL
  studentCount: number; // QACR
  serviceInterval: number; // IAR
  arrivalDistribution: "normal" | "exp" | "uniform";

  constructor(
      internalQueueLimit: number,
      tableLimit: number,
      registrationTime: number,
      servingTime: number,
      tableTime: number,
      turnstileLimit: number,
      studentCount: number,
      serviceInterval: number,
      arrivalDistribution: "normal" | "exp" | "uniform"
  ) {
      // Validação dos parâmetros numéricos
      const validatePositive = (value: number, name: string) => {
          if (typeof value !== 'number' || value <= 0) {
              throw new Error(`${name} deve ser um número maior que 0`);
          }
      };

      // Validação dos parâmetros
      validatePositive(internalQueueLimit, 'internalQueueLimit (LFI)');
      validatePositive(tableLimit, 'tableLimit (LM)');
      validatePositive(registrationTime, 'registrationTime (TMDM)');
      validatePositive(servingTime, 'servingTime (TMPSC)');
      validatePositive(tableTime, 'tableTime (TMPNM)');
      validatePositive(turnstileLimit, 'turnstileLimit (QAL)');
      validatePositive(studentCount, 'studentCount (QACR)');
      validatePositive(serviceInterval, 'serviceInterval (IAR)');

      // Validação da distribuição
      if (!["normal", "log", "linear"].includes(arrivalDistribution)) {
          throw new Error('Distribuição de chegada inválida');
      }

      // Atribuições
      this.internalQueueLimit = internalQueueLimit;
      this.tableLimit = tableLimit;
      this.registrationTime = registrationTime;
      this.servingTime = servingTime;
      this.tableTime = tableTime;
      this.turnstileLimit = turnstileLimit;
      this.studentCount = studentCount;
      this.serviceInterval = serviceInterval;
      this.arrivalDistribution = arrivalDistribution;
  }
}