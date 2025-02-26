import { Student } from "./student";

/**
 * @class Table
 * @description Representa uma mesa no refeitório, gerenciando os alunos que estão se alimentando.
 */
export class Table {
    /**
     * @private
     * @property students
     * @type {Array<Student>}
     * @description Lista de alunos que estão ocupando a mesa.
     */
    private students: Array<Student>;

    /**
     * @private
     * @property tableLimit
     * @type {number}
     * @description Número máximo de alunos que a mesa pode acomodar.
     */
    private tableLimit: number;

    /**
     * @constructor
     * @param {number} tableLimit - O limite de alunos que a mesa pode acomodar.
     * @description Inicializa uma nova instância da classe Table.
     */
    constructor(tableLimit: number) {
        this.tableLimit = tableLimit;
        this.students = [];
    }

    /**
     * @public
     * @method addStudent
     * @param {Student} student - O aluno a ser adicionado à mesa.
     * @description Adiciona um aluno à mesa, se houver espaço disponível.
     * @throws {Error} - Lança um erro se a mesa estiver cheia.
     */
    public addStudent(student: Student): void {
        if (this.students.length == this.tableLimit) {
            throw new Error("Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas.");
        }
        this.students.push(student);
    }

    /**
     * @public
     * @method removeStudent
     * @param {Student} student - O aluno a ser removido da mesa.
     * @description Remove um aluno da mesa.
     * @throws {Error} - Lança um erro se o aluno não estiver na mesa.
     */
    public removeStudent(student: Student): void {
        const initialLength = this.students.length;
        this.students = this.students.filter(s => s !== student);
        if (this.students.length === initialLength) {
            throw new Error("O estudante não existe.");
        }
    }

    /**
     * @public
     * @method getTableLimit
     * @returns {number} - O limite de alunos que a mesa pode acomodar.
     * @description Retorna o limite de alunos da mesa.
     */
    public getTableLimit(): number {
        return this.tableLimit;
    }

    /**
     * @public
     * @method checkManyStudentsAreInTable
     * @returns {number} - O número de alunos atualmente na mesa.
     * @description Retorna o número de alunos que estão atualmente ocupando a mesa.
     */
    public checkManyStudentsAreInTable(): number {
        return this.students.length;
    }
}