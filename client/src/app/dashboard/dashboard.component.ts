import { Component, OnInit } from '@angular/core';
import { User } from '../user/models/user-request';
import { UserService } from '../user/user.service';
import * as jwt_decode from 'jwt-decode';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task/models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null
  id: number
  authToken: any;
  title = 'Task-management-app';
  userTasks: Task[];
  constructor(
    private userService: UserService,
    private localstorageservice: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user
      this.id =  user?.id
    })
    
    // console.log('id', this.id)
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      // console.log('user', this.user);
    },
      error => alert(error)
    );
  }
  gotoCreateTask(id: number | null) {
    this.router.navigate(['create-task']);
  }

  gotoCreateProject(id: number | null) {
    this.router.navigate(['createProject', id]);
  }
}
