import { Cafeteria } from "@/domain/simulation-engine/system/cafeteria";
import { Student } from "@/domain/simulation-engine/system/student";

describe('Cafeteria', () => {
  let cafeteria: Cafeteria;
  let estudante: Student;

  beforeEach(() => {
    cafeteria = new Cafeteria(2, 5, 1); // limite: 2, tempo médio de atendimento: 5, quantidade de mesas: 1
    estudante = new Student(1, 2, 3, 4); // arrivalMoment: 1, serviceMoment: 2, timeToType: 3, tableTime: 4
  });

  // Teste para adicionar estudante à fila externa
  test('deve adicionar um estudante à fila externa', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    expect(cafeteria.getInternalQueueSize()).toBe(0); // Verifica se a fila interna está vazia
  });

  // Teste para mover estudante da fila externa para a catraca
  test('deve mover um estudante da fila externa para a catraca', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    const resultado = cafeteria.moveStudentFromExternalQueueToTurnstile();
    expect(resultado).toBeTruthy(); // Verifica se o movimento foi bem-sucedido
  });

  // Teste para lançar erro ao mover estudante para catraca ocupada
  test('deve lançar erro ao mover estudante para catraca ocupada', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile(); // Ocupa a catraca
    const outroEstudante = new Student(2, 3, 4, 5);
    cafeteria.addStudentToExternalQueue(outroEstudante);
    expect(() => cafeteria.moveStudentFromExternalQueueToTurnstile()).toThrow(
      "Não é possível adicionar um estudante a uma catraca que já está ocupada."
    );
  });

  // Teste para mover estudante da catraca para a fila interna
  test('deve mover um estudante da catraca para a fila interna', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    const resultado = cafeteria.moveStudentFromTurnstileToInternalQueue();
    expect(resultado).toBeTruthy(); // Verifica se o movimento foi bem-sucedido
    expect(cafeteria.getInternalQueueSize()).toBe(1); // Verifica se a fila interna tem 1 estudante
  });

  // Teste para lançar erro ao mover estudante para fila interna cheia
  test('deve lançar erro ao mover estudante para fila interna cheia', () => {
    // Preenche a fila interna até o limite
    for (let i = 0; i < 2; i++) {
      const estudanteTemp = new Student(i, i + 1, i + 2, i + 3);
      cafeteria.addStudentToExternalQueue(estudanteTemp);
      cafeteria.moveStudentFromExternalQueueToTurnstile();
      cafeteria.moveStudentFromTurnstileToInternalQueue();
    }

    // Tenta adicionar mais um estudante à fila interna
    const estudanteExtra = new Student(3, 4, 5, 6);
    cafeteria.addStudentToExternalQueue(estudanteExtra);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    expect(() => cafeteria.moveStudentFromTurnstileToInternalQueue()).toThrow(
      "Não é possível adicionar um estudante a uma fila interna que já está cheia."
    );
  });

  // Teste para mover estudante da fila interna para o serviço
  test('deve mover um estudante da fila interna para o serviço', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    const resultado = cafeteria.moveStudentFromInternalQueueToService();
    expect(resultado).toBeTruthy(); // Verifica se o movimento foi bem-sucedido
  });

  // Teste para lançar erro ao mover estudante para serviço ocupado
  test('deve lançar erro ao mover estudante para serviço ocupado', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    cafeteria.moveStudentFromInternalQueueToService(); // Ocupa o serviço

    const outroEstudante = new Student(2, 3, 4, 5);
    cafeteria.addStudentToExternalQueue(outroEstudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow(
      "Não é possível adicionar um estudante a um serviço que já está ocupado."
    );
  });

  // Teste para mover estudante do serviço para a mesa
  test('deve mover um estudante do serviço para a mesa', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    cafeteria.moveStudentFromInternalQueueToService();
    const resultado = cafeteria.moveStudentFromServiceToTable();
    expect(resultado).toBeTruthy(); // Verifica se o movimento foi bem-sucedido
  });

  // Teste para remover estudante da cafeteria
  test('deve remover um estudante da cafeteria', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    cafeteria.moveStudentFromInternalQueueToService();
    cafeteria.moveStudentFromServiceToTable();
    const estudanteRemovido = cafeteria.removeStudentFromCafeteria();
    expect(estudanteRemovido).toEqual(estudante); // Verifica se o estudante removido é o mesmo que foi adicionado
  });

  // Teste para obter o tamanho da fila interna
  test('deve retornar o tamanho da fila interna', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    const tamanhoFilaInterna = cafeteria.getInternalQueueSize();
    expect(tamanhoFilaInterna).toBe(1); // Verifica se o tamanho da fila interna é 1
  });

  // Teste para lançar erro ao mover estudante para serviço quando as mesas estão ocupadas
  test('deve lançar erro ao mover estudante para serviço quando as mesas estão ocupadas', () => {
    cafeteria.addStudentToExternalQueue(estudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();
    cafeteria.moveStudentFromInternalQueueToService();
    cafeteria.moveStudentFromServiceToTable(); // Ocupa a mesa

    const outroEstudante = new Student(2, 3, 4, 5);
    cafeteria.addStudentToExternalQueue(outroEstudante);
    cafeteria.moveStudentFromExternalQueueToTurnstile();
    cafeteria.moveStudentFromTurnstileToInternalQueue();

    expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow(
      "Não é possível adicionar estudantes a uma mesa que já está ocupada."
    );
  });

  // Teste para lançar erro ao tentar mover estudante da fila interna vazia
  test('deve lançar erro ao tentar mover estudante da fila interna vazia', () => {
    expect(() => cafeteria.moveStudentFromInternalQueueToService()).toThrow(
      "Não é possível remover estudantes de uma fila que está vazia."
    );
  });

  // Teste para verificar o comportamento quando a fila externa está vazia
  test('deve lançar erro ao tentar mover estudante da fila externa vazia', () => {
    expect(() => cafeteria.moveStudentFromExternalQueueToTurnstile()).toThrow(
      "Não é possível remover estudantes de uma fila que está vazia."
    );
  });

  // Teste para verificar o comportamento quando a catraca está vazia
  test('deve lançar erro ao tentar mover estudante da catraca vazia', () => {
    expect(() => cafeteria.moveStudentFromTurnstileToInternalQueue()).toThrow(
      "Não é possível remover um estudante de uma catraca que está vazia."
    );
  });

  // Teste para verificar o comportamento quando o serviço está vazio
  test('deve lançar erro ao tentar mover estudante do serviço vazio', () => {
    expect(() => cafeteria.moveStudentFromServiceToTable()).toThrow(
      "Não é possível remover um estudante de um serviço que está vazio."
    );
  });

  // Teste para verificar o comportamento quando a mesa está vazia
  test('deve lançar erro ao tentar remover estudante da mesa vazia', () => {
    expect(() => cafeteria.removeStudentFromCafeteria()).toThrow(
      "Não é possível remover estudantes de uma mesa que está vazia."
    );
  });
});