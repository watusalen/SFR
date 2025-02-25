import { Table } from '@/domain/simulation-engine/system/table';
import { Student } from '@/domain/simulation-engine/system/student';

describe('Table', () => {
    let table: Table;
    let student: Student;

    beforeEach(() => {
        table = new Table(2); // Limite de 2 estudantes
        student = new Student(1000, 2000, 3000);
    });

    // Testes para addStudent
    describe('addStudent', () => {
        it('should add a student to the table', () => {
            table.addStudent(student);
            expect(table.checkManyStudentsAreInTable()).toBe(1);
        });

        it('should throw an error if the table is full', () => {
            table.addStudent(student);
            table.addStudent(student);
            expect(() => table.addStudent(student)).toThrow("Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas.");
        });
    });

    // Testes para removeStudent
    describe('removeStudent', () => {
        it('should remove a student from the table', () => {
            table.addStudent(student);
            table.removeStudent(student);
            expect(table.checkManyStudentsAreInTable()).toBe(0);
        });

        it('should throw an error if the student does not exist', () => {
            expect(() => table.removeStudent(student)).toThrow("O estudante não existe.");
        });
    });

    // Testes para getTableLimit
    describe('getTableLimit', () => {
        it('should return the table limit', () => {
            expect(table.getTableLimit()).toBe(2);
        });
    });

    // Testes para checkManyStudentsAreInTable
    describe('checkManyStudentsAreInTable', () => {
        it('should return the number of students in the table', () => {
            table.addStudent(student);
            expect(table.checkManyStudentsAreInTable()).toBe(1);
        });
    });
});