import { Employee } from "../modules/Employee";
import { EmployeeManager } from "../modules/EmployeeManager";
import { Task } from "../modules/Task";
import {
  TaskTypesEnum,
  TaskPrioritiesEnum,
  TaskStatusesEnum,
} from "../enums/enum";

describe("EmployeeManager", () => {
  let employeeManager: EmployeeManager;
  let task: Task;
  let employee: Employee;

  beforeEach(() => {
    employeeManager = new EmployeeManager([]);
    employee = new Employee("Alice", "Smith", "developer");
    task = new Task(
      "Task 1",
      "This is task number one",
      TaskTypesEnum.STORY,
      TaskPrioritiesEnum.HIGH,
      TaskStatusesEnum.DELAYED,
      "week"
    );
  });

  it("should be an instance of EmployeeManager", () => {
    expect(employeeManager).toBeInstanceOf(EmployeeManager);
  });

  it("should add employee to the list", () => {
    employeeManager.addEmployee(employee);
    expect(employeeManager.getEmployees().length).toBe(1);
    expect(employeeManager.getEmployees()[0]).toBe(employee);
  });

  it("should set task to employee", () => {
    employeeManager.addEmployee(employee);
    employeeManager.assignTaskToEmployee(employee.getId(), task);
    const assignedTasks = employee.getTasks();
    expect(assignedTasks.length).toBe(1);
    expect(assignedTasks[0]).toBe(task);
  });

  it("should edit employee position", () => {
    employeeManager.addEmployee(employee);
    employeeManager.editPosition(employee.getId(), "manager");
    expect(employee.getPosition()).toBe("manager");
  });

  it("should throw error when deleting non-existing employee", () => {
    expect(() => employeeManager.deleteEmployee(12)).toThrow(
      "No employee found with ID 12."
    );
  });

  it("should throw error when editing position for employee with unfinished tasks without providing new employee ID", () => {
    employeeManager.addEmployee(employee);
    employee.assignTask(task);
    expect(() =>
      employeeManager.editPosition(employee.getId(), "engineer")
    ).toThrow(
      "Employee with ID 1 has unfinished tasks. Provide new employee ID for reassignment."
    );
  });
});
