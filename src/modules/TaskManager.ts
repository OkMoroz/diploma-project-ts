import { Task } from "./Task";
import { Employee } from "./Employee";
import { TaskStatusesEnum } from "../enums/enum";
import { TaskFilter } from "./TaskFilter";
import { SortType } from "../types/types";
import { TaskList } from "./TaskList";
import { EmployeeRole } from "../types/types";
import { Logger } from "./patterns/index";

export class TaskManager {
  private _tasks: TaskList | null = null;
  private logger: Logger = Logger.getInstance();
  public taskList: Task[];
  private _role: EmployeeRole;

  constructor(role: EmployeeRole) {
    this._role = role;
    this.taskList = [];
    this._tasks = new TaskList();
  }

  public update(message: string): void {
    this.logger.log(`[Observer]: ${message}`);
  }

  public getTaskWithEmployee(): Task[] {
    if (this._tasks === null) {
      return [];
    }

    return this._tasks.taskList.filter((elem) => elem.employee !== null);
  }

  public get role(): EmployeeRole {
    return this._role;
  }

  public set role(role: EmployeeRole) {
    this._role = role;
  }

  public createNewTask(task: Task): void {
    this.logger.log(`New task with id: [${task.id}] created`);
    this._tasks.taskList = task;
  }

  public setEmployeeToTask(taskId: number, employee: Employee): void {
    if (!this.canManageTasks()) {
      this.logger.log(
        `Permission denied: Insufficient permission to manage tasks`
      );
      throw new Error(
        "Permission denied: Insufficient permission to manage tasks"
      );
    } else {
      this._tasks.taskList.map((el) =>
        el.id === taskId ? el.assignEmployee(employee) : undefined
      );
      this.logger.log(
        `Employee [${employee.id}] has been assigned to task [${taskId}]`
      );
    }
  }

  public editTask(id: number, task: Task): TaskList | Task {
    if (!this.canManageTasks()) {
      this.logger.log(
        "Permission denied: Insufficient permission to edit tasks"
      );
      throw new Error(
        "Permission denied: Insufficient permission to edit tasks"
      );
    }

    let index = this._tasks.taskList.findIndex((elem) => elem.id === id);

    if (index === -1) {
      return;
    }

    let element = this._tasks.taskList[index];
    let employee = element.employee;

    if (element) {
      Object.keys(task).forEach((key) =>
        key !== "id" ? (element[key] = task[key]) : element[key]
      );
    }

    if (employee) {
      element.setEmployee = employee;
    }

    this.logger.log(`Task with id: [${id}] has been successfully edited`);

    return this._tasks;
  }

  public deleteTask(id: number): TaskList {
    if (!this.canManageTasks()) {
      this.logger.log(
        "Permission denied: Insufficient permission to delete tasks"
      );
      throw new Error(
        "Permission denied: Insufficient permission to delete tasks"
      );
    } else {
      let index = this._tasks.taskList.findIndex((elem) => elem.id === id);

      if (index === -1) {
        return;
      } else {
        this._tasks.taskList.splice(index, 1);
        this.logger.log(`Task with id: [${id}] has been successfully deleted`);
      }
    }

    return this._tasks;
  }

  public renewTaskStatus(
    id: number,
    status: TaskStatusesEnum
  ): TaskList | boolean {
    if (!this.canManageTasks()) {
      this.logger.log(
        "Permission denied: Insufficient permission to renew tasks"
      );
      throw new Error(
        "Permission denied: Insufficient permission to renew tasks"
      );
    } else {
      let element = this._tasks.taskList.find((elem) => elem.id === id);

      if (element === undefined || element.employee === undefined) {
        this.logger.log(
          "Permission denied: Unable to change task status without an employee"
        );
        throw new Error(
          "Permission denied: Unable to change task status without an employee"
        );
      }

      element.status = status;
      this._tasks.taskList.find((elem) =>
        elem.id === id ? (elem = element) : false
      );
      this.logger.log(
        `Task status for id: [${id}] has been successfully updated`
      );
    }

    return this._tasks;
  }

  public filterTasks(filter: TaskFilter): Task[] {
    return this._tasks.taskList.filter((task) => {
      return (
        (!filter.type || task.type === filter.type) &&
        (!filter.priority || task.priority === filter.priority) &&
        (!filter.status || task.status === filter.status) &&
        (!filter.term || task.term === filter.term) &&
        (!filter.employee || task.employee === filter.employee)
      );
    });
  }

  public bubbleSortTasks(field: SortType): Task[] {
    let length = this._tasks.taskList.length;
    let task = this._tasks.taskList;

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (task[j][field] > task[j + 1][field]) {
          let temp = task[j];
          task[j] = task[j + 1];
          task[j + 1] = temp;
        }
      }
    }
    return this._tasks.taskList;
  }

  public choiceSortTasks(field: SortType): Task[] {
    const tasks = this._tasks.taskList;
    const length = tasks.length;

    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < length; j++) {
        if (tasks[j][field] < tasks[minIndex][field]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [tasks[i], tasks[minIndex]] = [tasks[minIndex], tasks[i]];
      }
    }

    return tasks;
  }

  private canManageTasks(): boolean {
    return this.role === "admin";
  }
}
