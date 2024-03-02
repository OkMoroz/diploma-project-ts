import { Task } from "../modules/Task";
import { TaskList } from "../modules/TaskList";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

describe("TaskList", () => {
  let taskList: TaskList;
  let task1: Task;
  let task2: Task;

  beforeEach(() => {
    taskList = new TaskList();
    task1 = new Task(
      "Task 1",
      "This is task number one",
      TaskTypesEnum.STORY,
      TaskPrioritiesEnum.HIGH,
      TaskStatusesEnum.DELAYED,
      "week"
    );
    task2 = new Task(
      "Task 2",
      "This is task number two",
      TaskTypesEnum.BUG,
      TaskPrioritiesEnum.LOW,
      TaskStatusesEnum.NEW,
      "day"
    );
  });

  it("should add task to the list", () => {
    taskList.addTask(task1);
    expect(taskList.taskList.length).toBe(1);
    expect(taskList.taskList[0]).toBe(task1);
  });

  it("should remove task from the list", () => {
    taskList.addTask(task1);
    taskList.addTask(task2);
    taskList.removeTask(task1);
    expect(taskList.taskList.length).toBe(1);
    expect(taskList.taskList).toContain(task2);
    expect(taskList.taskList).not.toContain(task1);
  });

  it("should return task by index", () => {
    taskList.addTask(task1);
    taskList.addTask(task2);
    expect(taskList.getTaskByIndex(0)).toBe(task1);
    expect(taskList.getTaskByIndex(1)).toBe(task2);
  });

  it("should return undefined if index is out of bounds when getting task", () => {
    taskList.addTask(task1);
    expect(taskList.getTaskByIndex(1)).toBeUndefined();
  });
});
