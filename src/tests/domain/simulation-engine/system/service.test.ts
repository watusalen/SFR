import { Service } from '@/domain/simulation-engine/system/service';
import { Student } from '@/domain/simulation-engine/system/student';

describe('Service', () => {
  let service: Service;
  let student: Student;

  beforeEach(() => {
    // Cria um novo serviço com tempo médio de atendimento de 5 unidades de tempo
    service = new Service(5);

    // Cria um estudante para os testes
    student = new Student(10, 15, 2, 5); // arrivalMoment: 10, serviceMoment: 15, timeToType: 2, tableTime: 5
  });

  test('deve adicionar um estudante ao serviço', () => {
    service.addStudent(student);
    expect(service.hasSomeone()).toBe(true);
  });

  test('deve lançar um erro ao tentar adicionar um estudante a um serviço ocupado', () => {
    service.addStudent(student);
    expect(() => service.addStudent(new Student(20, 25, 3, 6))).toThrow(
      "Não é possível adicionar um estudante a um serviço que já está ocupado."
    );
  });

  test('deve remover um estudante do serviço', () => {
    service.addStudent(student);
    const removedStudent = service.removeStudent();
    expect(removedStudent).toBe(student);
    expect(service.hasSomeone()).toBe(false);
  });

  test('deve lançar um erro ao tentar remover um estudante de um serviço vazio', () => {
    expect(() => service.removeStudent()).toThrow(
      "Não é possível remover um estudante de um serviço que está vazio."
    );
  });

  test('deve travar o serviço', () => {
    service.lock();
    expect(service['locked']).toBe(true); // Acesso privado usando colchetes (não recomendado em produção)
  });

  test('deve destravar o serviço', () => {
    service.lock();
    service.unlock();
    expect(service['locked']).toBe(false); // Acesso privado usando colchetes (não recomendado em produção)
  });

  test('deve verificar se há alguém no serviço', () => {
    expect(service.hasSomeone()).toBe(false);

    service.addStudent(student);
    expect(service.hasSomeone()).toBe(true);

    service.removeStudent();
    expect(service.hasSomeone()).toBe(false);
  });
});