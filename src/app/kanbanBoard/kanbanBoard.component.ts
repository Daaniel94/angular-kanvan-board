import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  newTask : string = null;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  //  Funcion para agregar nueva Tarea al tablero
  addTask(newTask){
    let addNewTask = {} as Task;
    addNewTask.name = newTask;
    addNewTask.stage = 0;
    this.tasks.push(addNewTask);
    this.newTask = '';
    this.configureTasksForRendering();
  }

  // Funcionamiento de las flechas
  taskForward(task){
    task.stage =task.stage + 1;
    this.configureTasksForRendering();
  }

  taskBack(task){
    task.stage =task.stage - 1;
    this.configureTasksForRendering();
  }

  // Funcion para eliminar tarea del tablero
  deleteTask(name){
    for( let i = 0; i < this.tasks.length; i++ ){
      if( this.tasks[i].name == name ){
        this.tasks.splice(i,1)
        this.configureTasksForRendering();
      }
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}