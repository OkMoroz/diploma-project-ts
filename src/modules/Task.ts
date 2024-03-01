import { Employee } from "./Employee";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

interface ITask {
  type: TaskTypesEnum;
  name: string;
  description: string;
  priority: TaskPrioritiesEnum;
  status: TaskStatusesEnum;
}

export class Task implements ITask {
  readonly id: number = Date.now();
  readonly dateCreated: string = new Date().toISOString();
  employee: Employee | null = null;

  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly type: TaskTypesEnum,
    public priority: TaskPrioritiesEnum,
    public status: TaskStatusesEnum,
    public readonly term: string
  ) {}

  getPriority(): TaskPrioritiesEnum {
    return this.priority;
  }

  setPriority(priority: TaskPrioritiesEnum): void {
    this.priority = priority;
  }

  getStatus(): TaskStatusesEnum {
    return this.status;
  }

  setStatus(status: TaskStatusesEnum): void {
    this.status = status;
  }

  getEmployee(): Employee | null {
    return this.employee;
  }

  assignEmployee(employee: Employee): void {
    this.employee = employee;
    employee.assignTask(this);
  }
}
