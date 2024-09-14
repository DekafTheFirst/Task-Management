import { Component } from '@angular/core';
import { UserService } from './user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task-management-app';
  userId: number | null = null;
  
  constructor( private userService: UserService, private route: ActivatedRoute, private router: Router,
    private localstorage: LocalStorageService, private toast: NgToastService, ) {
  }
  
  ngOnInit(): void {
    // console.log('userId', this.userId)
  }
  

}
