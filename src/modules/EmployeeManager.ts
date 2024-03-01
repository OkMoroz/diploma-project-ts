import { Employee } from "./Employee";
import { Task } from "./Task";
import { EmployeeList } from "./EmployeeList";
import { TaskStatusesEnum } from "../enums/enum";
import { Facade } from "./patterns/index";
import { Logger } from "./patterns/index";
import { Observer } from "./patterns/index";
import { isNumber, isNumberArray } from "../validateDataTypes/typeValidator";

export class EmployeeManager implements Observer {
  private employees: EmployeeList = new EmployeeList();
  private logger: Logger = Logger.getInstance();
  private facade: Facade;

  constructor(tasks: Task[]) {
    this.facade = new Facade(tasks);
  }

  update(message: string): void {
    this.logger.log(`[Observer]: ${message}`);
  }

  getEmployees(): Employee[] {
    return this.employees.employeeList;
  }

  getEmployeesWithTasks(): Employee[] {
    return this.employees.employeeList.filter(
      (employee) => employee.tasks.length > 0
    );
  }

  addEmployee(employee: Employee): void {
    this.employees.addEmployee(employee);
    this.logger.log(`Added employee with ID ${employee.id} to the list.`);
  }

  editEmployeeData(id: number, newEmployeeData: Employee): void {
    const index = this.employees.employeeList.findIndex(
      (employee) => employee.id === id
    );
    if (index === -1) {
      this.logger.log(`No employee found with ID ${id}.`);
      return;
    }
    const employee = this.employees.employeeList[index];
    Object.assign(employee, newEmployeeData);
    this.logger.log(`Employee with ID ${id} has been updated.`);
  }

  deleteEmployee(id: number): void {
    const index = this.employees.employeeList.findIndex(
      (employee) => employee.id === id
    );
    if (index === -1) {
      this.logger.log(`No employee found with ID ${id}.`);
      return;
    }
    this.employees.employeeList.splice(index, 1);
    this.logger.log(`Employee with ID ${id} has been deleted.`);
  }

  assignTaskToEmployee(employeeId: number, task: Task): void {
    const employee = this.employees.employeeList.find(
      (employee) => employee.id === employeeId
    );
    if (!employee) {
      this.logger.log(`No employee found with ID ${employeeId}.`);
      return;
    }
    employee.assignTask(task);
    this.logger.log(
      `Task ${task.id} has been assigned to employee with ID ${employeeId}.`
    );
  }

  editPosition(
    employeeId: number,
    newPosition: string,
    newEmployeeId?: number | number[]
  ): void {
    const employee = this.employees.employeeList.find(
      (employee) => employee.id === employeeId
    );
    if (!employee) {
      this.logger.log(`No employee found with ID ${employeeId}.`);
      return;
    }
    const unfinishedTasks = employee.tasks.filter(
      (task) => task.status !== TaskStatusesEnum.FINISHED
    );
    if (unfinishedTasks.length > 0 && newEmployeeId === undefined) {
      this.logger.log(
        `Employee with ID ${employeeId} has unfinished tasks. Provide new employee ID for reassignment.`
      );
      return;
    }
    if (newEmployeeId !== undefined) {
      if (isNumber(newEmployeeId)) {
        this.resetTask(unfinishedTasks, newEmployeeId);
      } else if (
        isNumberArray(newEmployeeId) &&
        newEmployeeId.length === unfinishedTasks.length
      ) {
        this.resetTask(unfinishedTasks, newEmployeeId);
      } else {
        this.logger.log(
          `Invalid new employee ID(s) provided for reassignment.`
        );
        return;
      }
      this.logger.log(
        `Unfinished tasks of employee with ID ${employeeId} have been reassigned.`
      );
    }
    employee.position = newPosition;
    this.logger.log(
      `Position of employee with ID ${employeeId} has been updated.`
    );
  }

  private resetTask(tasks: Task[], newEmployeeId: number | number[]): void {
    const employees = Array.isArray(newEmployeeId)
      ? this.employees.employeeList.filter((employee) =>
          newEmployeeId.includes(employee.id)
        )
      : [
          this.employees.employeeList.find(
            (employee) => employee.id === newEmployeeId
          ),
        ];
    if (employees.some((employee) => !employee)) {
      this.logger.log(`Invalid employee ID(s) provided for reassignment.`);
      return;
    }
    tasks.forEach((task, index) => {
      const employee = employees[index];
      if (employee) {
        employee.assignTask(task);
      }
    });
  }
}
