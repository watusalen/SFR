import { Student } from "./system/student";
import { Cafeteria } from "./system/cafeteria";
import { EventMachine } from "./events/event-machine";
import { StudentArrival } from "./events/student-arrival";

const cafeteria = new Cafeteria(5, 2, 1);
const eventMachine = new EventMachine();

const student1: Student = new Student(10, 100, 10);
const student2: Student = new Student(10, 100, 10);
const student3: Student = new Student(10, 100, 10);
const student4: Student = new Student(10, 100, 10);
const student5: Student = new Student(10, 100, 10);
const student6: Student = new Student(10, 100, 10);
const student7: Student = new Student(10, 100, 10);

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
