import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-order-taskpriority',
  templateUrl: './order-taskpriority.component.html',
  styleUrls: ['./order-taskpriority.component.css']
})
export class OrderTaskpriorityComponent implements OnInit{
  tasks: Task[];
  selectedValue: string = "TODO";
  constructor(private taskservice: TaskService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
      this.taskservice.orderTaskByPriority().subscribe(data => {
        this.tasks = data;
      });
  }

  gotoPriority(priority: string) {
    this.router.navigate(['orderTask']);
  }

  gotoStatus(status: string) {
    this.router.navigate(['sortTask'], {queryParams: {status}})
  }

  gotoTasks(){
    this.router.navigate(['allTask']);
  }


}
