import { Employee } from "../modules/Employee";

describe("Employee", () => {
  let employee: Employee;

  beforeEach(() => {
    employee = new Employee("Alice", "Smith", "developer");
  });

  it("should have a position", () => {
    expect(employee.getPosition()).toBe("developer");
  });

  it("should be able to set a new position", () => {
    employee.setPosition("senior developer");
    expect(employee.getPosition()).toBe("senior developer");
  });

  it("should have an empty task list initially", () => {
    expect(employee.getTasks()).toEqual([]);
  });
});
