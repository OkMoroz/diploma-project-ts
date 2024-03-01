import { Task } from "./Task";

export class Employee {
  private readonly _id: number;
  private _tasks: Task[] = [];

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private position: string
  ) {
    this._id = Date.now();
  }

  getId(): number {
    return this._id;
  }

  getPosition(): string {
    return this.position;
  }

  setPosition(newPosition: string): void {
    this.position = newPosition;
  }

  getTasks(): Task[] {
    return [...this._tasks];
  }

  assignTask(task: Task): void {
    this._tasks.push(task);
    task.assignEmployee(this);
  }
}
