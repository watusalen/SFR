import { Student } from "./system/student";
import { Cafeteria } from "./system/cafeteria";
import { EventMachine } from "./events/event-machine";
import { StudentArrival } from "./events/student-arrival";

const cafeteria = new Cafeteria(10, 10, 10);
const eventMachine = new EventMachine();

const student1: Student = new Student(10, 100, 10);
const student2: Student = new Student(20, 200, 20);
const student3: Student = new Student(10, 100, 10);

const event1 = new StudentArrival(1, cafeteria, eventMachine, student1);
const event2 = new StudentArrival(2, cafeteria, eventMachine, student2);

eventMachine.addEvent(event1);
eventMachine.addEvent(event2);

eventMachine.processEvents();