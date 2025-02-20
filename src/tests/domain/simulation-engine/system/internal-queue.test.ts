import { InternalQueue } from "@/domain/simulation-engine/system/internal-queue";
import { Student } from "@/domain/simulation-engine/system/student";

describe('InternalQueue', () => {
  let internalQueue: InternalQueue;
  let student1: Student;
  let student2: Student;

  beforeEach(() => {
    // Cria uma fila interna com limite de 2 estudantes
    internalQueue = new InternalQueue(2);

    // Cria dois estudantes para os testes
    student1 = new Student(10, 15, 2, 5); // arrivalMoment: 10, serviceMoment: 15, timeToType: 2, tableTime: 5
    student2 = new Student(20, 25, 3, 6); // arrivalMoment: 20, serviceMoment: 25, timeToType: 3, tableTime: 6
  });

  test('deve adicionar um estudante à fila interna', () => {
    internalQueue.addStudent(student1);
    expect(internalQueue.checkSizeOfQueue()).toBe(1);
  });

  test('deve lançar um erro ao tentar adicionar estudante a uma fila cheia', () => {
    internalQueue.addStudent(student1);
    internalQueue.addStudent(student2);

    expect(() => internalQueue.addStudent(new Student(30, 35, 4, 7))).toThrow(
      "Não é possível adicionar um estudante a uma fila interna que já está cheia."
    );
  });

  test('deve remover um estudante da fila interna', () => {
    internalQueue.addStudent(student1);
    const removedStudent = internalQueue.removeStudent();
    expect(removedStudent).toBe(student1);
    expect(internalQueue.checkSizeOfQueue()).toBe(0);
  });

  test('deve lançar um erro ao tentar remover estudante de uma fila vazia', () => {
    expect(() => internalQueue.removeStudent()).toThrow(
      "Não é possível remover estudantes de uma fila que está vazia."
    );
  });

  test('deve verificar se a fila está cheia', () => {
    internalQueue.addStudent(student1);
    expect(internalQueue.checkLimit()).toBe(false);

    internalQueue.addStudent(student2);
    expect(internalQueue.checkLimit()).toBe(true);
  });

  test('deve retornar o tamanho correto da fila', () => {
    expect(internalQueue.checkSizeOfQueue()).toBe(0);

    internalQueue.addStudent(student1);
    expect(internalQueue.checkSizeOfQueue()).toBe(1);

    internalQueue.addStudent(student2);
    expect(internalQueue.checkSizeOfQueue()).toBe(2);
  });
});