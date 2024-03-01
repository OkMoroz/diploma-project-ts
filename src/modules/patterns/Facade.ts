export class Facade {
  private tasks: Task[];

  constructor(tasks: Task[]) {
    this.tasks = tasks;
  }

  findAndProcessEmployees(idEmployee: number): boolean {
    const tasksFound = this.tasks.filter((task) => {
      return task.employee?.id === idEmployee && task.status !== "FINISHED";
    });
    return tasksFound.length === 0;
  }
}
