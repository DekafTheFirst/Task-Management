import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../models/user-request';
import { Task } from 'src/app/task/models/task.model';
import { TaskService } from 'src/app/task/task.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {
  userId: number;
  tasks: Task[];
  filteredTasks: Task[]
  selectedStatus: string = 'TODO';
  selectedPriority: string;
  input: string;
  user: User | null = null;
  task: Task;


  constructor(private userservice: UserService, private userService: UserService, private router: Router, private route: ActivatedRoute, private taskservice: TaskService,
    private toast: NgToastService) {

  }

  statusOptions = [
    { value: 'TODO', label: 'Todo' },
    { value: 'INPROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Complete' }
  ];

  priorityOptions = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ];

  onPriorityChange(selectedPriority: string) {
    console.log('Selected Priority:', selectedPriority);
    // Handle the priority change
  }

  filterTasks(): void {
    // Assuming `selectedPriority` and `selectedStatus` are properties to hold the selected values
    this.filteredTasks = this.tasks.filter(task =>
      (this.selectedPriority ? task.priority === this.selectedPriority : true) &&
      (this.selectedStatus ? task.status === this.selectedStatus : true)
    );
  }

  onStatusChange(selectedStatus: string) {
    console.log('Selelected Status', selectedStatus);
    // Handle the priority change

  }


  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user
      this.userId = user?.id
    })

    console.log('userId', this.userId)
    this.userservice.getUserById(this.userId).subscribe((data: any) => {
      this.tasks = data.tasks;
      this.user = data;
    });
  }

  getTask(id: number) {
    this.taskservice.getTaskById(id).subscribe(data => {
      this.task = data;
    })
  }

  gotoStatus(status: string) {
    this.router.navigate(['sortTask'], { queryParams: { status } })
  }



  gotoCreateTask() {
    this.router.navigate(['create-task']);
  }

  deleteUserTask(id: number) {
    this.getTask(id);
    // console.log('this.task', this.task)

    this.taskservice.deleteTask(id).subscribe((data: any) => {
      console.log(data);
      this.toast.success({ detail: "Success", summary: data, duration: 3000 });
      window.location.reload();
    },
      error => this.toast.error({ detail: "Error", summary: error, duration: 3000 }));
  }

  gotToUpdateTask(taskId: number) {
    console.log('taskId', taskId)
    this.router.navigate([`update-task`])
  }



  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
