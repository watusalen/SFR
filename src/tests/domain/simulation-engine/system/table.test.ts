import { Table } from '@/domain/simulation-engine/system/table';
import { Student } from '@/domain/simulation-engine/system/student';

describe('Table', () => {
    let table: Table;
    let student1: Student;
    let student2: Student;

    beforeEach(() => {
        table = new Table(2); // Limite de 2 estudantes na mesa
        student1 = new Student(10, 2); // registrationTime = 10, tableTime = 2
        student2 = new Student(15, 3); // registrationTime = 15, tableTime = 3
    });

    it('should add a student to the table', () => {
        table.addStudent(student1);
        expect(table.checkManyStudentsAreInTable()).toBe(1);
    });

    it('should throw an error when adding a student to a full table', () => {
        table.addStudent(student1);
        table.addStudent(student2);
        expect(() => table.addStudent(student1)).toThrow("Não é possível adicionar um estudante no serviço porque todas as mesas estão ocupadas.");
    });

    it('should remove a student from the table', () => {
        table.addStudent(student1);
        const removedStudent = table.removeStudent();
        expect(removedStudent).toBe(student1);
        expect(table.checkManyStudentsAreInTable()).toBe(0);
    });

    it('should throw an error when removing a student from an empty table', () => {
        expect(() => table.removeStudent()).toThrow("Não é possível remover estudantes de uma mesa que está vazia.");
    });

    it('should check if all tables are occupied', () => {
        expect(table.checkIfAllTableIsOccupied()).toBe(false);
        table.addStudent(student1);
        table.addStudent(student2);
        expect(table.checkIfAllTableIsOccupied()).toBe(true);
    });

    it('should get the table limit', () => {
        expect(table.getTableLimit()).toBe(2);
    });

    it('should check how many students are in the table', () => {
        expect(table.checkManyStudentsAreInTable()).toBe(0);
        table.addStudent(student1);
        expect(table.checkManyStudentsAreInTable()).toBe(1);
    });
});