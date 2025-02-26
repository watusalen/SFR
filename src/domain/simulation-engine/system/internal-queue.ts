import { Student } from "./student";

/**
 * @class InternalQueue
 * @description Representa a fila interna do refeitório, gerenciando a entrada e saída de alunos.
 */
export class InternalQueue {
    /**
     * @private
     * @property students
     * @type {Array<Student>}
     * @description Lista de alunos na fila interna.
     */
    private students: Array<Student>;

    /**
     * @private
     * @property internalQueueLimit
     * @type {number}
     * @description O limite máximo de alunos que a fila interna pode conter.
     */
    private internalQueueLimit: number;

    /**
     * @constructor
     * @param {number} internalQueueLimit - O limite máximo de alunos para a fila interna.
     * @description Inicializa uma nova instância da classe InternalQueue.
     */
    constructor(internalQueueLimit: number) {
        this.students = [];
        this.internalQueueLimit = internalQueueLimit;
    }

    /**
     * @public
     * @method addStudent
     * @param {Student} student - O aluno a ser adicionado à fila interna.
     * @description Adiciona um aluno à fila interna, se houver espaço disponível.
     * @throws {Error} - Lança um erro se a fila interna estiver cheia.
     */
    public addStudent(student: Student): void {
        if (this.students.length === this.internalQueueLimit) {
            throw new Error("Não é possível adicionar um estudante a uma fila interna que já está cheia.");
        }
        this.students.push(student);
    }

    /**
     * @public
     * @method removeStudent
     * @returns {Student} - O aluno removido da fila interna.
     * @description Remove o primeiro aluno da fila interna.
     * @throws {Error} - Lança um erro se a fila interna estiver vazia.
     */
    public removeStudent(): Student {
        if (this.students.length === 0) {
            throw new Error("Não é possível remover estudantes de uma fila que está vazia.");
        }
        return this.students.shift()!;
    }

    /**
     * @public
     * @method checkInternalQueueLimitRecheadMaximum
     * @returns {boolean} - True se a fila interna atingiu o limite máximo, false caso contrário.
     * @description Verifica se a fila interna atingiu o limite máximo de alunos.
     */
    public checkInternalQueueLimitRecheadMaximum(): boolean {
        return this.students.length === this.internalQueueLimit;
    }

    /**
     * @public
     * @method checkSizeOfQueue
     * @returns {number} - O número de alunos na fila interna.
     * @description Retorna o tamanho atual da fila interna.
     */
    public checkSizeOfQueue(): number {
        return this.students.length;
    }

    /**
     * @public
     * @method getInternalQueueLimit
     * @returns {number} - O limite máximo de alunos da fila interna.
     * @description Retorna o limite máximo de alunos que a fila interna pode conter.
     */
    public getInternalQueueLimit(): number {
        return this.internalQueueLimit;
    }
}