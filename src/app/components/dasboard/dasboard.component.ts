import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITask } from 'src/app/interfaces/task.interface';
import { MatRadioChange } from '@angular/material/radio';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  dataSource : ITask[];
  displayedColumns : string[];
  private subscription$: Subscription;

  constructor(private _taskService : TaskService) { }

  ngOnInit(): void {
    return this.tableViewAll();
  }

  private tableViewAll() : void {
    this.displayedColumns = ['projectName', 'employeeName', 'date', 'hours'];
    this.dataSource = [];
    this.dataSource = this._taskService.getAllTasks();
  }

  private tableGroupByProject() : void{
    this.displayedColumns = ['projectName', 'hours'];
    this.dataSource = [];

    this.subscription$ = this._taskService.getTasksGroupByProject()
      .subscribe(task =>
        this.dataSource.push(task)
    );
  }

  private tableGroupByProjectEmployee() : void{
    this.displayedColumns = ['projectName', 'employeeName', 'hours'];
    this.dataSource = [];

    this.subscription$ = this._taskService.getTasksGroupByProjectEmployee()
      .subscribe(task =>
        this.dataSource.push(task)
    );
  }

  private tableGroupByEmployeeProject() : void{
    this.displayedColumns = ['employeeName', 'projectName', 'hours'];
    this.dataSource = [];
    
    this.subscription$ = this._taskService.getTasksGroupByEmployeeProject()
      .subscribe(task =>
        this.dataSource.push(task)
    );
    
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onItemGroupChanged(event: MatRadioChange){
    if(event.value == 0)
    {
      return this.tableViewAll();
    }
    else if(event.value == 1)
    {
      return this.tableGroupByProject();
    }
    else if(event.value == 2)
    {
      return this.tableGroupByProjectEmployee();
    }
    else(event.value == 3)
    {
      return this.tableGroupByEmployeeProject();
    }
  }

}
