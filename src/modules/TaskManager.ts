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
  private _role: EmployeeRole;

  public get role(): EmployeeRole {
    return this._role;
  }

  public set role(role: EmployeeRole) {
    this._role = role;
  }

  constructor(role: EmployeeRole) {
    this._role = role;
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

  public createNewTask(task: Task): void {
    if (this._tasks === null) {
      this.logger.log("Task list is not initialized");
      return;
    }
    this.logger.log(`New task with id: [${task.id}] created`);
    this._tasks.addTask(task);
  }

  public setEmployeeToTask(taskId: number, employee: Employee): void {
    if (!this.canManageTasks()) {
      this.logger.log(
        `Permission denied: Insufficient permission to manage tasks`
      );
      throw new Error(
        "Permission denied: Insufficient permission to manage tasks"
      );
    }

    if (this._tasks === null) {
      this.logger.log("Task list is not initialized");
      return;
    }

    const task = this._tasks.getTaskByIndex(taskId);
    if (!task) {
      this.logger.log(`Task with id ${taskId} does not exist`);
      return;
    }

    task.assignEmployee(employee);
    this.logger.log(
      `Employee [${employee.id}] has been assigned to task [${taskId}]`
    );
  }

  public editTask(id: number, task: Task): TaskList | undefined {
    if (!this.canManageTasks()) {
      this.logger.log(
        "Permission denied: Insufficient permission to edit tasks"
      );
      throw new Error(
        "Permission denied: Insufficient permission to edit tasks"
      );
    }

    if (this._tasks === null) {
      this.logger.log(`Task list is not initialized`);
      return;
    }

    const index = this._tasks.taskList.findIndex((elem) => elem.id === id);

    if (index === -1) {
      return;
    }

    const element = this._tasks.taskList[index];
    if (!element) {
      return;
    }

    Object.entries(task).forEach(([key, value]) => {
      if (key !== "id") {
        element[key as keyof Task] = value;
      }
    });

    this.logger.log(`Task with id: [${id}] has been successfully edited`);

    return this._tasks;
  }

  public deleteTask(id: number): TaskList | undefined {
    if (!this.canManageTasks()) {
      this.logger.log(
        `Permission denied: Insufficient permission to delete tasks`
      );
      throw new Error(
        `Permission denied: Insufficient permission to delete tasks`
      );
    } else {
      if (this._tasks === null || this._tasks === undefined) {
        this.logger.log("Task list is not initialized");
        return undefined;
      }

      const index = this._tasks.taskList.findIndex((elem) => elem.id === id);

      if (index === -1) {
        return undefined;
      } else {
        this._tasks.taskList.splice(index, 1);
        this.logger.log(`Task with id: [${id}] has been successfully deleted`);
        return this._tasks;
      }
    }
  }

  public renewTaskStatus(
    id: number,
    status: TaskStatusesEnum
  ): TaskList | boolean {
    if (!this.canManageTasks()) {
      this.logger.log(
        `Permission denied: Insufficient permission to renew tasks`
      );
      throw new Error(
        `Permission denied: Insufficient permission to renew tasks`
      );
    } else {
      if (this._tasks === null) {
        this.logger.log(`Task list is not initialized`);
        return false;
      }

      const element = this._tasks.taskList.find((elem) => elem.id === id);

      if (element === undefined || element.employee === undefined) {
        this.logger.log(
          `Permission denied: Unable to change task status without an employee`
        );
        throw new Error(
          `Permission denied: Unable to change task status without an employee`
        );
      }
    }
    element.setStatus(status);

    this.logger.log(
      `Task status for id: [${id}] has been successfully updated`
    );
  }

  public filterTasks(filter: TaskFilter): Task[] {
    if (this._tasks === null) {
      return [];
    }

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

  public bubbleSortTasks(field: keyof Task): Task[] {
    if (this._tasks === null) {
      return [];
    }

    const tasks: Task[] = this._tasks.taskList.slice();

    const length = tasks.length;

    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (tasks[j][field] > tasks[j + 1][field]) {
          let temp = tasks[j];
          tasks[j] = tasks[j + 1];
          tasks[j + 1] = temp;
        }
      }
    }
    return tasks;
  }

  public choiceSortTasks(field: keyof Task): Task[] {
    if (this._tasks === null || this._tasks.taskList === null) {
      return [];
    }

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
