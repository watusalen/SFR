import { Turnstile } from "@/domain/simulation-engine/system/turnstile";
import { Student } from "@/domain/simulation-engine/system/student";

describe('Turnstile', () => {
  let turnstile: Turnstile;
  let student: Student;

  beforeEach(() => {
    // Cria uma nova catraca e um estudante para cada teste
    turnstile = new Turnstile();
    student = new Student(10, 15, 2, 5); // arrivalMoment: 10, serviceMoment: 15, timeToType: 2, tableTime: 5
  });

  test('deve adicionar um estudante à catraca', () => {
    turnstile.addStudent(student);
    expect(turnstile.hasSomeone()).toBe(true);
  });

  test('deve lançar um erro ao tentar adicionar um estudante a uma catraca ocupada', () => {
    turnstile.addStudent(student);
    expect(() => turnstile.addStudent(new Student(20, 25, 3, 6))).toThrow(
      "Não é possível adicionar um estudante a uma catraca que já está ocupada."
    );
  });

  test('deve remover um estudante da catraca', () => {
    turnstile.addStudent(student);
    const removedStudent = turnstile.removeStudent();
    expect(removedStudent).toBe(student);
    expect(turnstile.hasSomeone()).toBe(false);
  });

  test('deve lançar um erro ao tentar remover um estudante de uma catraca vazia', () => {
    expect(() => turnstile.removeStudent()).toThrow(
      "Não é possível remover um estudante de uma catraca que está vazia."
    );
  });

  test('deve travar a catraca', () => {
    turnstile.lock();
    expect(turnstile['locked']).toBe(true); // Acesso privado usando colchetes (não recomendado em produção)
  });

  test('deve destravar a catraca', () => {
    turnstile.lock();
    turnstile.unlock();
    expect(turnstile['locked']).toBe(false); // Acesso privado usando colchetes (não recomendado em produção)
  });

  test('deve verificar se há alguém na catraca', () => {
    expect(turnstile.hasSomeone()).toBe(false);

    turnstile.addStudent(student);
    expect(turnstile.hasSomeone()).toBe(true);

    turnstile.removeStudent();
    expect(turnstile.hasSomeone()).toBe(false);
  });
});