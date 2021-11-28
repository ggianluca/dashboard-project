import { IEmployee } from "./employee.interface";
import { IProject } from "./project.interface";

export interface ITask {
    project: IProject;
    employee: IEmployee;
    date: string;
    hours: number;
}