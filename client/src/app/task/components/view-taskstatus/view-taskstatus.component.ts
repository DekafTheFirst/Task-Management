import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-view-taskstatus',
  templateUrl: './view-taskstatus.component.html',
  styleUrls: ['./view-taskstatus.component.css']
})

export class ViewTaskstatusComponent implements OnInit {
  tasks: Task[];
  selectedValue: string = 'TODO';
  status: string;
  constructor(private taskservice: TaskService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {  
    this.route.queryParams.subscribe(params => {
      const paramValue = params['status'];
      this.taskservice.filterTaskByStatus(paramValue).subscribe(data => {
          this.tasks = data;
      },
      error => alert(error));
    })
    
  }

  gotoStatus(status: string) {
    this.router.navigate(['sortTask'], {queryParams: {status}})
  }
  
  gotoTasks(){
    this.router.navigate(['allTask']);
  }

}
