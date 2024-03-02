import { Employee } from "../modules/Employee";
import { EmployeeList } from "../modules/EmployeeList";

describe("EmployeeList", () => {
  let employeeList: EmployeeList;
  let employee1: Employee;
  let employee2: Employee;

  beforeEach(() => {
    employeeList = new EmployeeList();
    employee1 = new Employee("Alice", "25", "alice@example.com");
    employee2 = new Employee("Bob", "30", "bob@example.com");
  });

  it("should add employee to the list", () => {
    employeeList.addEmployee(employee1);
    expect(employeeList.employeeList.length).toBe(1);
    expect(employeeList.employeeList[0]).toBe(employee1);
  });

  it("should get employee by index", () => {
    employeeList.addEmployee(employee1);
    employeeList.addEmployee(employee2);

    expect(employeeList.getEmployee(0)).toBe(employee1);
    expect(employeeList.getEmployee(1)).toBe(employee2);
  });

  it("should return undefined if index is out of bounds when getting employee", () => {
    employeeList.addEmployee(employee1);
    expect(employeeList.getEmployee(1)).toBeUndefined();
  });

  it("should remove employee from the list", () => {
    employeeList.addEmployee(employee1);
    employeeList.addEmployee(employee2);

    employeeList.removeEmployee(0);
    expect(employeeList.employeeList.length).toBe(1);
    expect(employeeList.employeeList[0]).toBe(employee2);
  });

  it("should return employee count", () => {
    employeeList.addEmployee(employee1);
    employeeList.addEmployee(employee2);

    expect(employeeList.getEmployeeCount()).toBe(2);
  });

  it("should clear the employee list", () => {
    employeeList.addEmployee(employee1);
    employeeList.addEmployee(employee2);

    employeeList.clearEmployeeList();
    expect(employeeList.employeeList.length).toBe(0);
  });
});
