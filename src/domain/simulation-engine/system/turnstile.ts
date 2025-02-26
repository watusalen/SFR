import { Student } from "./student";

/**
 * @class Turnstile
 * @description Representa uma catraca no refeitório, controlando o acesso dos alunos à fila interna.
 */
export class Turnstile {
    /**
     * @private
     * @property locked
     * @type {boolean}
     * @description Indica se a catraca está bloqueada (true) ou desbloqueada (false).
     */
    private locked: boolean;

    /**
     * @private
     * @property student
     * @type {Student | undefined}
     * @description O aluno que está passando pela catraca, ou undefined se estiver vazia.
     */
    private student: Student | undefined;

    /**
     * @private
     * @property turnstileLimit
     * @type {number}
     * @description O limite de pessoas na fila interna para liberar a catraca.
     */
    private turnstileLimit: number;

    /**
     * @constructor
     * @param {number} turnstileLimit - O limite de pessoas na fila interna para liberar a catraca.
     * @description Inicializa uma nova instância da classe Turnstile.
     */
    constructor(turnstileLimit: number) {
        this.turnstileLimit = turnstileLimit;
        this.locked = false;
    }

    /**
     * @public
     * @method addStudent
     * @param {Student} student - O aluno a ser adicionado à catraca.
     * @description Adiciona um aluno à catraca, se estiver vazia.
     * @throws {Error} - Lança um erro se a catraca já estiver ocupada.
     */
    public addStudent(student: Student): void {
        if (this.student) {
            throw new Error("Não é possível adicionar um estudante a uma catraca que já está ocupada.");
        }
        this.student = student;
    }

    /**
     * @public
     * @method removeStudent
     * @returns {Student} - O aluno removido da catraca.
     * @description Remove o aluno da catraca, se estiver ocupada.
     * @throws {Error} - Lança um erro se a catraca estiver vazia.
     */
    public removeStudent(): Student {
        if (!this.student) {
            throw new Error("Não é possível remover um estudante de uma catraca que está vazia.");
        }
        const student: Student | undefined = this.student;
        this.student = undefined;
        return student;
    }

    /**
     * @public
     * @method lock
     * @description Bloqueia a catraca, impedindo a passagem de alunos.
     * @throws {Error} - Lança um erro se a catraca já estiver bloqueada.
     */
    public lock(): void {
        if (this.locked === true) {
            throw new Error("Não é possível trancar uma catraca que já está trancada.");
        }
        this.locked = true;
    }

    /**
     * @public
     * @method unlock
     * @description Desbloqueia a catraca, permitindo a passagem de alunos.
     * @throws {Error} - Lança um erro se a catraca já estiver desbloqueada.
     */
    public unlock(): void {
        if (this.locked === false) {
            throw new Error("Não é possível destrancar uma catraca que já está destrancada.");
        }
        this.locked = false;
    }

    /**
     * @public
     * @method hasSomeone
     * @returns {boolean} - True se houver um aluno na catraca, false caso contrário.
     * @description Verifica se há algum aluno passando pela catraca.
     */
    public hasSomeone(): boolean {
        if (this.student) {
            return true;
        }
        return false;
    }

    /**
     * @public
     * @method getTurnstileLimit
     * @returns {number} - O limite de pessoas na fila interna para liberar a catraca.
     * @description Retorna o limite de pessoas na fila interna para liberar a catraca.
     * @throws {Error} - Lança um erro se o limite não estiver definido.
     */
    public getTurnstileLimit(): number {
        if (!this.turnstileLimit) {
            throw new Error("O limite de pessoas para liberar a catraca ainda não foi definido.");
        }
        return this.turnstileLimit;
    }

    /**
     * @public
     * @method getLocked
     * @returns {boolean} - O estado de bloqueio da catraca.
     * @description Retorna o estado de bloqueio atual da catraca.
     */
    public getLocked(): boolean {
        return this.locked;
    }
}