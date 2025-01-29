import { SimulationParameters } from "@/domain/data-management/Entities/simulation-parameters";

describe("SimulationParameters", () => {
  it("should create a new SimulationParameters instance", () => {
    const parameters = new SimulationParameters(10, 10, 10, 10, 10, 10, 10, 10, "normal");

    expect(parameters.internalQueueLimit).toBe(10);
    expect(parameters.tableLimit).toBe(10);
    expect(parameters.registrationTime).toBe(10);
    expect(parameters.servingTime).toBe(10);
    expect(parameters.tableTime).toBe(10);
    expect(parameters.turnstileLimit).toBe(10);
    expect(parameters.studentCount).toBe(10);
    expect(parameters.serviceInterval).toBe(10);
    expect(parameters.arrivalDistribution).toBe("normal");
  });
});
