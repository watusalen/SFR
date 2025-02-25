import { Student } from "./system/student";
import { Cafeteria } from "./system/cafeteria";
import { EventMachine } from "./events/event-machine";
import { StudentArrival } from "./events/student-arrival";

const cafeteria = new Cafeteria(5, 3, 1);
const eventMachine = new EventMachine();

const student1: Student = new Student(10, 100, 10);
const student2: Student = new Student(11, 101, 11);
const student3: Student = new Student(12, 102, 12);
const student4: Student = new Student(13, 103, 13);
const student5: Student = new Student(15, 104, 14);
const student6: Student = new Student(16, 105, 15);
const student7: Student = new Student(17, 106, 16);

const event1 = new StudentArrival(1, cafeteria, eventMachine, student1);
const event2 = new StudentArrival(2, cafeteria, eventMachine, student2);
const event3 = new StudentArrival(3, cafeteria, eventMachine, student3);
const event4 = new StudentArrival(4, cafeteria, eventMachine, student4);
const event5 = new StudentArrival(5, cafeteria, eventMachine, student5);
const event6 = new StudentArrival(6, cafeteria, eventMachine, student6);
const event7 = new StudentArrival(7, cafeteria, eventMachine, student7);

eventMachine.addEvent(event1);
eventMachine.addEvent(event2);
eventMachine.addEvent(event3);
eventMachine.addEvent(event4);
eventMachine.addEvent(event5);
eventMachine.addEvent(event6);
eventMachine.addEvent(event7);

eventMachine.processEvents();
