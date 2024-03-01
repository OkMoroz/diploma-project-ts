import { Employee } from "./Employee";

export class EmployeeList {
  private _employeeList: Employee[] = [];

  get employeeList(): Employee[] {
    return this._employeeList;
  }

  addEmployee(employee: Employee): void {
    this._employeeList.push(employee);
  }

  getEmployee(index: number): Employee | undefined {
    return this._employeeList[index];
  }

  removeEmployee(index: number): void {
    this._employeeList.splice(index, 1);
  }

  getEmployeeCount(): number {
    return this._employeeList.length;
  }

  clearEmployeeList(): void {
    this._employeeList = [];
  }
}
