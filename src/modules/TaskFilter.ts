import { Employee } from "./Employee";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

export interface TaskFilterParams {
  type?: TaskTypesEnum;
  priority?: TaskPrioritiesEnum;
  status?: TaskStatusesEnum;
  term?: string;
  employee?: Employee;
}

export class TaskFilter implements TaskFilterParams {
  constructor(
    public type?: TaskTypesEnum,
    public priority?: TaskPrioritiesEnum,
    public status?: TaskStatusesEnum,
    public term?: string,
    public employee?: Employee
  ) {}

  static getDefault(): TaskFilter {
    return new TaskFilter();
  }
}
