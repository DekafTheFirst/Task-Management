import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user-request';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  showModal: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

  }
  user: User = new User;

  gotoLogin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    this.authService.register(this.user)
      .subscribe(data => {
        console.log(data);
        this.toast.success({ detail: "Success", summary: "Register Successful", duration: 5000 });
        this.gotoLogin()
      },
        error => { this.toast.error({ detail: "Error", summary: "Registration failed", duration: 5000 }); }
      )
    console.log("hello");
  }

}
