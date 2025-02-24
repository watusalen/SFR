import { Student } from "@/domain/simulation-engine/system/student";

describe('Student', () => {
    let student: Student;

    beforeEach(() => {
        student = new Student(10, 20);
    });

    it('should set and get arrivalMoment correctly', () => {
        student.setArrivalMoment(100);
        expect(student.getArrivalMoment()).toBe(100);
    });

    it('should set and get serviceMoment correctly', () => {
        student.setServiceMoment(200);
        expect(student.getServiceMoment()).toBe(200);
    });

    it('should set timeToServe correctly', () => {
        student.setArrivalMoment(100);
        student.setServiceMoment(200);
        student.setTimeToServe();
        expect(student.getTimeToServe()).toBe(100);
    });

    it('should throw error when calculating timeToServe without setting moments', () => {
        expect(() => student.setTimeToServe()).toThrowError("Os momentos de chegada e atendimento devem ser definidos antes de calcular o tempo de atendimento.");
    });

    it('should get registrationTime correctly', () => {
        expect(student.getRegistrationTime()).toBe(10);
    });

    it('should get tableTime correctly', () => {
        expect(student.getTableTime()).toBe(20);
    });

    it('should throw error when getting undefined arrivalMoment', () => {
        expect(() => student.getArrivalMoment()).toThrowError("O momento de chegada do estudante não foi definido.");
    });

    it('should throw error when getting undefined serviceMoment', () => {
        expect(() => student.getServiceMoment()).toThrowError("O momento de atendimento do estudante não foi definido.");
    });

    it('should throw error when getting undefined timeToServe', () => {
        expect(() => student.getTimeToServe()).toThrowError("O tempo da chegada até o atendimento não foi definido.");
    });

    it('should throw error when getting undefined registrationTime', () => {
        const newStudent = new Student(undefined as any, 20);
        expect(() => newStudent.getRegistrationTime()).toThrowError("O momento de digitação do estudante não foi definido.");
    });

    it('should throw error when getting undefined tableTime', () => {
        const newStudent = new Student(10, undefined as any);
        expect(() => newStudent.getTableTime()).toThrowError("O momento de atendimento do estudante não foi definido.");
    });
});
