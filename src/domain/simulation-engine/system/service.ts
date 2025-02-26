import { Student } from "./student";

/**
 * @class Service
 * @description Representa um serviço de atendimento no refeitório, gerenciando o estado de ocupação e bloqueio.
 */
export class Service {
    /**
     * @private
     * @property locked
     * @type {boolean}
     * @description Indica se o serviço está bloqueado (true) ou desbloqueado (false).
     */
    private locked: boolean;

    /**
     * @private
     * @property student
     * @type {Student | undefined}
     * @description O aluno que está sendo atendido no serviço, ou undefined se estiver vazio.
     */
    private student: Student | undefined;

    /**
     * @constructor
     * @description Inicializa uma nova instância da classe Service com o serviço desbloqueado e vazio.
     */
    constructor() {
        this.locked = false;
    }

    /**
     * @public
     * @method addStudent
     * @param {Student} student - O aluno a ser adicionado ao serviço.
     * @description Adiciona um aluno ao serviço, se estiver vazio.
     * @throws {Error} - Lança um erro se o serviço já estiver ocupado.
     */
    public addStudent(student: Student): void {
        if (this.student) {
            throw new Error("Não é possível adicionar um estudante a um serviço que já está ocupado.");
        }
        this.student = student;
    }

    /**
     * @public
     * @method removeStudent
     * @returns {Student} - O aluno removido do serviço.
     * @description Remove o aluno do serviço, se estiver ocupado.
     * @throws {Error} - Lança um erro se o serviço estiver vazio.
     */
    public removeStudent(): Student {
        if (!this.student) {
            throw new Error("Não é possível remover um estudante de um serviço que está vazio.");
        }
        const student = this.student;
        this.student = undefined;
        return student;
    }

    /**
     * @public
     * @method lock
     * @description Bloqueia o serviço, impedindo a adição de novos alunos.
     * @throws {Error} - Lança um erro se o serviço já estiver bloqueado.
     */
    public lock(): void {
        if (this.locked === true) {
            throw new Error("Não é possível trancar um atendimento que já está trancado.");
        }
        this.locked = true;
    }

    /**
     * @public
     * @method unlock
     * @description Desbloqueia o serviço, permitindo a adição de novos alunos.
     * @throws {Error} - Lança um erro se o serviço já estiver desbloqueado.
     */
    public unlock(): void {
        if (this.locked === false) {
            throw new Error("Não é possível destrancar um atendimento que já está destrancado.");
        }
        this.locked = false;
    }

    /**
     * @public
     * @method hasSomeone
     * @returns {boolean} - True se houver um aluno no serviço, false caso contrário.
     * @description Verifica se há algum aluno sendo atendido no serviço.
     */
    public hasSomeone(): boolean {
        if (this.student) {
            return true;
        }
        return false;
    }

    /**
     * @public
     * @method getLocked
     * @returns {boolean} - O estado de bloqueio do serviço.
     * @description Retorna o estado de bloqueio atual do serviço.
     */
    public getLocked(): boolean {
        return this.locked;
    }
}