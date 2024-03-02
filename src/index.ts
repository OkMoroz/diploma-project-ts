import { SortAlgorythm, SortType, EmployeeRole } from "./types/types";
import { TaskStatusesEnum } from "./enums/enum";
import { Task } from "./modules/Task";
import { Employee } from "./modules/Employee";
import { TaskList } from "./modules/TaskList";
import { TaskManager } from "./modules/TaskManager";
import { EmployeeManager } from "./modules/EmployeeManager";
import { TaskFilter } from "./modules/TaskFilter";

class TaskManagementSystem {
  private _taskManager: TaskManager = new TaskManager("admin");
  private _employeeManager: EmployeeManager = new EmployeeManager([]);

  get taskManager(): TaskManager {
    return this._taskManager;
  }

  get tasksWithAssignedEmployees(): Task[] {
    const taskWithEmployee = this._taskManager.getTaskWithEmployee();
    if (Array.isArray(taskWithEmployee)) {
      return taskWithEmployee;
    } else {
      throw new Error("Tasks with assigned employees are not available");
    }
  }

  get employeesWithAssignedTasks(): Employee[] {
    const employeesWithTasks = this._employeeManager.getEmployeesWithTasks();
    if (Array.isArray(employeesWithTasks)) {
      return employeesWithTasks;
    } else {
      throw new Error("Employees with assigned tasks are not available");
    }
  }

  addTask(task: Task): void {
    this._taskManager.createNewTask(task);
  }

  addEmployee(employee: Employee): void {
    this._employeeManager.addEmployee(employee);
  }

  editTask(id: number, task: Task): void {
    this._taskManager.editTask(id, task);
  }

  editTaskManagerRole(role: EmployeeRole): void {
    this._taskManager.role = role;
  }

  deleteTask(id: number): void {
    this._taskManager.deleteTask(id);
  }

  deleteEmployee(id: number): void {
    this._employeeManager.deleteEmployee(id);
  }

  sortTasks(algorithm: SortAlgorythm, field: SortType): void {
    algorithm === "bubble"
      ? this._taskManager.bubbleSortTasks(field)
      : this._taskManager.choiceSortTasks(field);
  }

  filterTasks(filter: TaskFilter): void {
    this._taskManager.filterTasks(filter);
  }

  renewTaskStatus(id: number, status: TaskStatusesEnum): void {
    this._taskManager.renewTaskStatus(id, status);
  }

  assignTaskToEmployee(id: number, task: Task): void {
    this._taskManager.setTaskToEmployee(id, task);
  }

  assignEmployeeToTask(id: number, employee: Employee): void {
    this._taskManager.setEmployeeToTask(id, employee);
  }

  editEmployeePosition(
    idEmployee: number,
    position: string,
    newEmployeeId?: number | number[]
  ): void {
    if (newEmployeeId !== undefined) {
      this._employeeManager.editPosition(idEmployee, position, newEmployeeId);
    } else {
      this._employeeManager.editPosition(idEmployee, position);
    }
  }
}

const manageSystem = new TaskManagementSystem();
