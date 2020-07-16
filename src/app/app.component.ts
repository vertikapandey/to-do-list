import { Component } from '@angular/core';

export interface Task {
  name: string;
  priority: number;
  isEditMode: boolean;
  changedValue: string;
  isChecked: boolean;
}

export interface KeyValue {
  key: string;
  value: Task;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do List';
  taskName = '';
  taskList: Task = {
    name: '',
    priority: 5,
    isEditMode: false,
    changedValue: '',
    isChecked: false
  };;
  taskId = 0;
  priority = 5;

  addTask(): number {
    this.taskList[this.taskId] = {
      name: this.taskName,
      priority: this.priority,
      isEditMode: false,
      changedValue: this.taskName,
      isChecked: false
    };
    return this.taskId++;
  }

  saveChanges(task: KeyValue): void {
    this.taskList[task.key].name = this.taskList[task.key].changedValue;
    this.taskList[task.key].isEditMode = false;
  }

  removeTask(task: KeyValue): void {
    delete this.taskList[task.key];
  }

  deleteAllSelectedItems() {
    for (const task in this.taskList) {
      if (this.taskList[task].isChecked) {
        delete this.taskList[task];
      }
    }
  }

  focusOnListItem(e: KeyboardEvent, task: KeyValue) {
    const activeEle = document.activeElement as HTMLElement;
    // tslint:disable-next-line: deprecation
    if (e.keyCode === 40) {
      const nextSibling = activeEle.nextElementSibling as HTMLElement;
      nextSibling.focus();
    }

    // tslint:disable-next-line: deprecation
    if (e.keyCode === 38) {
      const previousSibling = activeEle.nextElementSibling as HTMLElement;
      previousSibling.focus();
    }

    // tslint:disable-next-line: deprecation
    if (e.keyCode === 13) {
      task.value.isChecked = true;
    }

  }
}
