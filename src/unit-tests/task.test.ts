import { Task } from "../modules/Task";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

describe("Task", () => {
  let task: Task;

  beforeEach(() => {
    task = new Task(
      "Task 1",
      "This is task number one",
      TaskTypesEnum.STORY,
      TaskPrioritiesEnum.HIGH,
      TaskStatusesEnum.DELAYED,
      "week"
    );
  });

  it("should have a name", () => {
    expect(task.name).toBe("Task 1");
  });

  it("should have a description", () => {
    expect(task.description).toBe("This is task number one");
  });

  it("should have a type", () => {
    expect(task.type).toBe(TaskTypesEnum.STORY);
  });

  it("should have a priority", () => {
    expect(task.priority).toBe(TaskPrioritiesEnum.HIGH);
  });

  it("should have a status", () => {
    expect(task.status).toBe(TaskStatusesEnum.DELAYED);
  });

  it("should have a term", () => {
    expect(task.term).toBe("week");
  });
});
