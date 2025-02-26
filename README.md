# Dining Hall Flow Simulator  

This repository contains the implementation of a dining hall flow simulation system, developed as the final project for the **Object-Oriented Programming (OOP)** and **Software Engineering** courses. The project was created from a fork of a professor's repository and follows a **Requirements Specification Document** to ensure adherence to system guidelines.  

## Objective  
The goal of this project is to model and simulate the flow of a university dining hall, analyzing the movement of students and the dynamics between queues, turnstiles, and the service area. The simulation is based on metrics and parameters provided by the user to evaluate the performance of these hypothetical conditions. The system's performance is also assessed.  

## Required Implementations  
The original code contains mocked classes that must be replaced with complete implementations. The main functionalities to be developed include:  

### **Simulation Engine**  
- Implementation of the simulation logic based on the parameters and metrics defined in the `SimulationParameters` and `SimulationResults` classes.  
- Control of student flow in the dining hall, including entry rules, queue blocking, and release conditions.  
- Use of an **event-driven machine** to process state changes in the system.  

### **Simulation Repository**  
- Implementation of the `SimulationRepositoryI` interface to ensure data persistence for simulations.  
- Required methods:  
  - `save(simulation)`: Save a simulation in the repository.  
  - `getById(id)`: Retrieve a simulation by its identifier.  
  - `getAll()`: Return all stored simulations.  
  - `delete(id)`: Remove a specific simulation.  

## Technologies Used  
- **TypeScript** for logic development and project structuring.  
- **Architecture based on SOLID principles**, ensuring code modularity and maintainability.  

## Project Status  
✅ Initial repository structure created.  
✅ Development of the simulation engine.  
✅ Creation of the simulation repository.  
🔄 Validation and testing of the simulation.  

This project will be updated as new features are implemented.  

---  

📢 **Contributions**: This is an academic project, but suggestions and improvements are always welcome!  
