import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import tasksData from '../../../api/tasksData.json';
import { from, groupBy, mergeMap, Observable, reduce, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks : ITask[] = [];

  constructor() { 
    
  }

  public getAllTasks() : ITask[]
  {
    return this._tasks = tasksData;
  }

  public getTasksGroupByProject() : Observable<ITask>
  {
    return from(this._tasks)
    .pipe(
      groupBy(task => task.project.id), 
      mergeMap(group => { 
        return group.pipe(toArray())
      }),
      mergeMap((groupTasks) => {
        return this.mapTasks(groupTasks);
      }),
    )
  }

  public getTasksGroupByProjectEmployee() : Observable<ITask>
  {
    return from(this._tasks)
    .pipe(
      groupBy(task => task.project.id), 
      mergeMap(group => { 
        return group.pipe(toArray())
      }),
      mergeMap((array) => {
        return from(array).pipe( 
          groupBy(task => task.employee.id),
          mergeMap(group => {
            return group.pipe(toArray());
          })
        );
      }),
      mergeMap((groupTasks) => {
        return this.mapTasks(groupTasks);
      }),   
    )
  }

  public getTasksGroupByEmployeeProject() : Observable<ITask>
  {
    return from(this._tasks)
    .pipe(
      groupBy(task => task.employee.id), 
      mergeMap(group => { 
        return group.pipe(toArray())
      }),
      mergeMap((array) => {
        return from(array).pipe( 
          groupBy(task => task.project.id),
          mergeMap(group => {
            return group.pipe(toArray());
          })
        );
      }),
      mergeMap((groupTasks) => {
        return this.mapTasks(groupTasks);
      }),   
    )
  }

  private mapTasks(tasks : ITask[]) : Observable<ITask>
  {
    return from(tasks).pipe( 
        reduce((tasks, currentTask) => ({
            date: currentTask.date,
            hours: currentTask.hours + tasks.hours,
            project: currentTask.project,
            employee: currentTask.employee
        }))
    );
  }
}
