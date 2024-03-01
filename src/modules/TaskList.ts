import { Task } from "./Task";

export class TaskList {
  private _taskList: Task[] = [];

  get taskList(): Task[] {
    return this._taskList;
  }

  addTask(task: Task): void {
    this._taskList.push(task);
  }

  removeTask(task: Task): void {
    const index = this._taskList.indexOf(task);
    if (index !== -1) {
      this._taskList.splice(index, 1);
    }
  }

  getTaskByIndex(index: number): Task | undefined {
    return this._taskList[index];
  }
}
