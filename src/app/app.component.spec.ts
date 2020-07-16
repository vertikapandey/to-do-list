import { TestBed, async } from '@angular/core/testing';
import { AppComponent, Task, KeyValue } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title as 'to-do-list'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('To Do List');
  });

  it(`should add task to the taskList'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.taskName = 'spec test todo';
    app.priority = 5;
    const taskId = app.addTask();
    expect(app.taskList[taskId].name).toEqual('spec test todo');
  });

  it(`should successfully save changes when task is edited'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.taskName = 'spec test todo';
    app.priority = 5;
    const taskId = app.addTask();
    app.taskList[taskId].changedValue = 'spec test todo changed';
    const editedTask: KeyValue = {
      key: taskId,
      value: app.taskList[taskId]
    };
    app.saveChanges(editedTask);
    expect(app.taskList[taskId].name).toEqual('spec test todo changed');
  });

  it(`should remove task'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.taskName = 'spec test todo';
    app.priority = 5;
    const taskId = app.addTask();
    const savedTask: KeyValue = {
      key: taskId,
      value: app.taskList[taskId]
    };
    app.removeTask(savedTask);
    expect(app.taskList[taskId]).toBe(undefined);
  });

  it(`should delete all selected items'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.taskName = 'spec test todo';
    app.priority = 5;
    const taskId1 = app.addTask();
    const taskId2 = app.addTask();
    app.taskList[taskId1].isChecked = true;
    app.taskList[taskId2].isChecked = true;
    app.deleteAllSelectedItems();
    expect(app.taskList[taskId1]).toBe(undefined);
    expect(app.taskList[taskId2]).toBe(undefined);
  });

});
