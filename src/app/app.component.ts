import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do List';
  taskName = '';
  taskList = {};
  taskId = 0;
  priority = 5;

  addTask(): void {
    this.taskList[this.taskId++] = 
    { name: this.taskName, priority: this.priority, isEditMode:false, changedValue: this.taskName };
  }

  saveChanges(task): void{
    this.taskList[task.key].name =  this.taskList[task.key].changedValue;
    this.taskList[task.key].isEditMode = false;
  }

  removeTask(task):void{
    delete  this.taskList[task.key];
  }
}
