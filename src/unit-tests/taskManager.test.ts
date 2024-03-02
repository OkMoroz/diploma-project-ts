import { Task } from "../modules/Task";
import { Employee } from "../modules/Employee";
import { TaskManager } from "../modules/TaskManager";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

describe("TaskManager", () => {
  let taskManager: TaskManager;
  let task1: Task;
  let task2: Task;
  let employee: Employee;

  beforeEach(() => {
    taskManager = new TaskManager("admin");
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
      TaskTypesEnum.TASK,
      TaskPrioritiesEnum.LOW,
      TaskStatusesEnum.IN_PROGRESS,
      "month"
    );
    employee = new Employee("John", "Doe", "developer");
  });

  it("should create a new task", () => {
    taskManager.createNewTask(task1);
    expect(taskManager.filterTasks({ type: TaskTypesEnum.STORY }).length).toBe(
      1
    );
  });

  it("should assign an employee to a task", () => {
    taskManager.createNewTask(task1);
    taskManager.setEmployeeToTask(task1.id, employee);
    expect(
      taskManager.filterTasks({ type: TaskTypesEnum.STORY })[0].getEmployee()
    ).toBe(employee);
  });

  it("should edit task details", () => {
    taskManager.createNewTask(task1);
    taskManager.editTask(task1.id, {
      id: task1.id,
      dateCreated: task1.dateCreated,
      name: "New Task Name",
      description: "Updated description",
      type: TaskTypesEnum.TASK,
      priority: TaskPrioritiesEnum.MEDIUM,
      status: TaskStatusesEnum.IN_PROGRESS,
      term: "updatedTerm",
      employee: task1.employee,
      getEmployee: task1.getEmployee,
      assignEmployee: task1.assignEmployee,
    });
    const updatedTask = taskManager.filterTasks({ id: task1.id })[0];
    expect(updatedTask.name).toBe("New Task Name");
    expect(updatedTask.description).toBe("Updated description");
    expect(updatedTask.type).toBe(TaskTypesEnum.TASK);
    expect(updatedTask.priority).toBe(TaskPrioritiesEnum.MEDIUM);
    expect(updatedTask.status).toBe(TaskStatusesEnum.IN_PROGRESS);
    expect(updatedTask.term).toBe("updatedTerm");
  });

  it("should delete a task", () => {
    taskManager.createNewTask(task1);
    taskManager.createNewTask(task2);
    taskManager.deleteTask(task1.id);
    expect(taskManager.filterTasks({}).length).toBe(1);
  });

  it("should renew task status", () => {
    taskManager.createNewTask(task1);
    taskManager.setEmployeeToTask(task1.id, employee);
    taskManager.renewTaskStatus(task1.id, TaskStatusesEnum.IN_PROGRESS);
    const renewedTask = taskManager.filterTasks({ id: task1.id })[0];
    expect(renewedTask.status).toBe(TaskStatusesEnum.IN_PROGRESS);
  });

  it("should filter tasks by type", () => {
    taskManager.createNewTask(task1);
    taskManager.createNewTask(task2);
    const filteredTasks = taskManager.filterTasks({ type: TaskTypesEnum.TASK });
    expect(filteredTasks.length).toBe(1);
  });

  it("should bubble sort tasks by name", () => {
    taskManager.createNewTask(task1);
    taskManager.createNewTask(task2);
    const sortedTasks = taskManager.bubbleSortTasks("name");
    expect(sortedTasks[0].name).toBe("Task 1");
    expect(sortedTasks[1].name).toBe("Task 2");
  });

  it("should choice sort tasks by name", () => {
    taskManager.createNewTask(task2);
    taskManager.createNewTask(task1);
    const sortedTasks = taskManager.choiceSortTasks("name");
    expect(sortedTasks[0].name).toBe("Task 1");
    expect(sortedTasks[1].name).toBe("Task 2");
  });
});
