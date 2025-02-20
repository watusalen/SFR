import { Table } from '@/domain/simulation-engine/system/table';
import { Student } from '@/domain/simulation-engine/system/student';

describe('Table', () => {
  let table: Table;
  let student1: Student;
  let student2: Student;

  beforeEach(() => {
    // Cria uma mesa com capacidade para 1 estudante
    table = new Table(1);

    // Cria dois estudantes para os testes
    student1 = new Student(10, 15, 2, 5); // arrivalMoment: 10, serviceMoment: 15, timeToType: 2, tableTime: 5
    student2 = new Student(20, 25, 3, 6); // arrivalMoment: 20, serviceMoment: 25, timeToType: 3, tableTime: 6
  });

  test('deve adicionar um estudante à mesa', () => {
    table.addStudent(student1);
    expect(table['student'].length).toBe(1);
  });

  test('deve lançar um erro ao tentar adicionar um estudante a uma mesa ocupada', () => {
    table.addStudent(student1);
    expect(() => table.addStudent(student2)).toThrow(
      "Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas."
    );
  });

  test('deve remover um estudante da mesa', () => {
    table.addStudent(student1);
    const removedStudent = table.removeStudent();
    expect(removedStudent).toBe(student1);
    expect(table['student'].length).toBe(0);
  });

  test('deve lançar um erro ao tentar remover um estudante de uma mesa vazia', () => {
    expect(() => table.removeStudent()).toThrow(
      "Não é possível remover estudantes de uma mesa que está vazia."
    );
  });

  test('deve verificar se a mesa está ocupada', () => {
    expect(table.checkIfTableIsOccupied()).toBe(false);

    table.addStudent(student1);
    expect(table.checkIfTableIsOccupied()).toBe(true);

    table.removeStudent();
    expect(table.checkIfTableIsOccupied()).toBe(false);
  });
});