import { Student } from "./student";

/**
 * @class ExternalQueue
 * @description Representa a fila externa do refeitório, gerenciando a chegada de alunos.
 */
export class ExternalQueue {
    /**
     * @private
     * @property students
     * @type {Array<Student>}
     * @description Lista de alunos na fila externa.
     */
    private students: Array<Student>;

    /**
     * @constructor
     * @description Inicializa uma nova instância da classe ExternalQueue.
     */
    constructor() {
        this.students = [];
    }

    /**
     * @public
     * @method addStudent
     * @param {Student} student - O aluno a ser adicionado à fila externa.
     * @description Adiciona um aluno ao final da fila externa.
     */
    public addStudent(student: Student): void {
        this.students.push(student);
    }

    /**
     * @public
     * @method removeStudent
     * @returns {Student} - O aluno removido do início da fila externa.
     * @description Remove o primeiro aluno da fila externa.
     * @throws {Error} - Lança um erro se a fila externa estiver vazia.
     */
    public removeStudent(): Student {
        if (this.students.length === 0) {
            throw new Error("Não é possível remover estudantes de uma fila que está vazia.");
        }
        return this.students.shift()!;
    }

    /**
     * @public
     * @method getStudent
     * @returns {number} - O número de alunos na fila externa.
     * @description Retorna o tamanho atual da fila externa.
     */
    public getStudent(): number {
        return this.students.length;
    }
}