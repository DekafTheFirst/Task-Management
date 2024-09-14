import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { windowToggle } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/user/models/user-request';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  task: Task = new Task;
  user: User = new User;
  id: number;

  constructor(private taskservice: TaskService, private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toaster: NgToastService) { }

    ngOnInit(): void {
      // Fetch userId from UserService (e.g., from local storage or a BehaviorSubject)
      this.id = this.userService.getUserIdFromLocalStorage()!;
      if (!this.id) {
        this.toaster.error({ detail: "Error", summary: "User ID not found", duration: 5000 });
        this.router.navigate(['']); // Redirect to login or error page
      }
    }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
    },
      error => alert(error));
  }

  gotoCreateTask(id: number) {
    this.router.navigate(['create-task', id]);
  }

  gotoDashboard() {
    this.router.navigate(['']);
  }

  gotoUserTask(id: number) {
    this.router.navigate(['']);
  }

  createTask() {

    this.taskservice.createTask(this.id, this.task).subscribe(data => {
      console.log(data);
      this.toaster.success({ detail: "Success", summary: "Task created", duration: 5000 });
      this.gotoUserTask(this.user.id);
    },
      error => this.toaster.error({ detail: "Error", summary: "An error occured" })
    );
  }

  onSubmit() {
    this.createTask();
  }

}
