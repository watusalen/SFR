import { Student } from "@/domain/simulation-engine/system/student";

describe('Student', () => {
  let student: Student;

  beforeEach(() => {
    // Cria um novo estudante para cada teste
    student = new Student(10, 15, 2, 5); // arrivalMoment: 10, serviceMoment: 15, timeToType: 2, tableTime: 5
  });

  test('deve criar um estudante com os valores corretos', () => {
    expect(student.getTimeToType()).toBe(2);
    expect(student.getTableTime()).toBe(5);
  });

  test('deve definir e obter o momento de chegada corretamente', () => {
    student.setArrivalMoment(10);
    expect(student.getArrivalMoment()).toBe(10);
  });

  test('deve lançar um erro ao tentar obter o momento de chegada não definido', () => {
    expect(() => student.getArrivalMoment()).toThrow("O momento de chegada do estudante não foi definido.");
  });

  test('deve definir e obter o momento de atendimento corretamente', () => {
    student.setServiceMoment(15);
    expect(student.getServiceMoment()).toBe(15);
  });

  test('deve lançar um erro ao tentar obter o momento de atendimento não definido', () => {
    expect(() => student.getServiceMoment()).toThrow("O momento de atendimento do estudante não foi definido.");
  });

  test('deve retornar o tempo de digitação corretamente', () => {
    expect(student.getTimeToType()).toBe(2);
  });

  test('deve retornar o tempo de mesa corretamente', () => {
    expect(student.getTableTime()).toBe(5);
  });
});