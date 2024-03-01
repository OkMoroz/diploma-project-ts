import { Employee } from "./Employee";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

interface ITask {
  readonly type: TaskTypesEnum;
  readonly name: string;
  readonly description: string;
  readonly priority: TaskPrioritiesEnum;
  readonly status: TaskStatusesEnum;
  readonly term: string;
}

export class Task implements ITask {
  readonly id: number;
  readonly dateCreated: string;
  readonly name: string;
  readonly description: string;
  readonly type: TaskTypesEnum;
  readonly priority: TaskPrioritiesEnum;
  readonly status: TaskStatusesEnum;
  readonly term: string;
  employee: Employee | null = null;

  constructor(
    name: string,
    description: string,
    type: TaskTypesEnum,
    priority: TaskPrioritiesEnum,
    status: TaskStatusesEnum,
    term: string
  ) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.priority = priority;
    this.status = status;
    this.term = term;
    this.id = Date.now();
    this.dateCreated = new Date().toISOString();
  }

  getEmployee(): Employee | null {
    return this.employee;
  }

  assignEmployee(employee: Employee): void {
    this.employee = employee;
    employee.assignTask(this);
  }
}
