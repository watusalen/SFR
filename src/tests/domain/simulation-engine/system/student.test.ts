import { Student } from "@/domain/simulation-engine/system/student";

describe('Student', () => {
    let student: Student;

    beforeEach(() => {
        student = new Student(1000, 2000, 3000);
    });

    // Testes para setArrivalMoment e getArrivalMoment
    describe('setArrivalMoment and getArrivalMoment', () => {
        it('should set and get the arrival moment', () => {
            student.setArrivalMoment(5000);
            expect(student.getArrivalMoment()).toBe(5000);
        });

        it('should throw an error if arrival moment is not set', () => {
            expect(() => student.getArrivalMoment()).toThrow("O momento de chegada do estudante não foi definido.");
        });
    });

    // Testes para setServiceMoment e getServiceMoment
    describe('setServiceMoment and getServiceMoment', () => {
        it('should set and get the service moment', () => {
            student.setServiceMoment(6000);
            expect(student.getServiceMoment()).toBe(6000);
        });

        it('should throw an error if service moment is not set', () => {
            expect(() => student.getServiceMoment()).toThrow("O momento de atendimento do estudante não foi definido.");
        });
    });

    // Testes para getRegistrationTime
    describe('getRegistrationTime', () => {
        it('should return the registration time', () => {
            expect(student.getRegistrationTime()).toBe(1000);
        });

        it('should throw an error if registration time is not defined', () => {
            const invalidStudent = new Student(undefined as any, 2000, 3000); // Forçando um valor inválido
            expect(() => invalidStudent.getRegistrationTime()).toThrow("O momento de digitação do estudante não foi definido.");
        });
    });

    // Testes para getTableTime
    describe('getTableTime', () => {
        it('should return the table time', () => {
            expect(student.getTableTime()).toBe(2000);
        });

        it('should throw an error if table time is not defined', () => {
            const invalidStudent = new Student(1000, undefined as any, 3000); // Forçando um valor inválido
            expect(() => invalidStudent.getTableTime()).toThrow("O momento de atendimento do estudante não foi definido.");
        });
    });

    // Testes para getAttendedTime
    describe('getAttendedTime', () => {
        it('should return the attended time', () => {
            expect(student.getAttendedTime()).toBe(3000);
        });
    });

    // Testes para getTimeToServe
    describe('getTimeToServe', () => {
        it('should return the time to serve', () => {
            student.setArrivalMoment(5000);
            student.setServiceMoment(7000);
            expect(student.getTimeToServe()).toBe(2000);
        });

        it('should throw an error if arrival moment is not set', () => {
            student.setServiceMoment(7000);
            expect(() => student.getTimeToServe()).toThrow("Os momentos de chegada e atendimento devem ser definidos antes de calcular o tempo de atendimento.");
        });

        it('should throw an error if service moment is not set', () => {
            student.setArrivalMoment(5000);
            expect(() => student.getTimeToServe()).toThrow("Os momentos de chegada e atendimento devem ser definidos antes de calcular o tempo de atendimento.");
        });

        it('should throw an error if neither arrival nor service moment is set', () => {
            expect(() => student.getTimeToServe()).toThrow("Os momentos de chegada e atendimento devem ser definidos antes de calcular o tempo de atendimento.");
        });
    });
});