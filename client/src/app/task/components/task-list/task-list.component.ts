import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  tasks: Task[];
  selectedValue: string = 'TODO';
  input: string;
  constructor(private taskservice: TaskService, private router: Router, private route: ActivatedRoute) {

  }
  
  ngOnInit(): void {
    this.taskservice.getAllTask().subscribe(data => {
      console.log(data);
      this.tasks = data;
    },
    error => alert(error));
  }

  gotoStatus(status: string) {
      this.router.navigate(['sortTask'], {queryParams: {status}})
  }
  gotoPriority() {
    this.router.navigate(['orderTask']);
  }

  gotoSearchResult(name: string) {
    this.router.navigate(['searchTask'], {queryParams: {name}});
  }


}
