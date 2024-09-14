import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit{
  tasks: Task[];
  constructor(private taskservice: TaskService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
    const paramValue = params['name'];
    this.taskservice.searchTask(paramValue).subscribe(data => {
      this.tasks = data;
    })
   })
  }

  

}
