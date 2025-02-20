import { ExternalQueue } from '@/domain/simulation-engine/system/external-queue';
import { Student } from '@/domain/simulation-engine/system/student';

describe('ExternalQueue', () => {
  let externalQueue: ExternalQueue;
  let student1: Student;
  let student2: Student;

  beforeEach(() => {
    // Cria uma nova fila externa e dois estudantes para os testes
    externalQueue = new ExternalQueue();
    student1 = new Student(10, 15, 2, 5); // arrivalMoment: 10, serviceMoment: 15, timeToType: 2, tableTime: 5
    student2 = new Student(20, 25, 3, 6); // arrivalMoment: 20, serviceMoment: 25, timeToType: 3, tableTime: 6
  });

  test('deve adicionar um estudante à fila externa', () => {
    externalQueue.addStudent(student1);
    expect(externalQueue['students'].length).toBe(1); // Acesso privado usando colchetes (não recomendado em produção)
  });

  test('deve remover um estudante da fila externa', () => {
    externalQueue.addStudent(student1);
    const removedStudent = externalQueue.removeStudent();
    expect(removedStudent).toBe(student1);
    expect(externalQueue['students'].length).toBe(0); // Acesso privado usando colchetes (não recomendado em produção)
  });

  test('deve lançar um erro ao tentar remover estudante de uma fila vazia', () => {
    expect(() => externalQueue.removeStudent()).toThrow(
      "Não é possível remover estudantes de uma fila que está vazia."
    );
  });

  test('deve manter a ordem FIFO (First In, First Out)', () => {
    externalQueue.addStudent(student1);
    externalQueue.addStudent(student2);

    const firstRemoved = externalQueue.removeStudent();
    const secondRemoved = externalQueue.removeStudent();

    expect(firstRemoved).toBe(student1);
    expect(secondRemoved).toBe(student2);
  });
});