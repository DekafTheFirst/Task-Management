// src/app/auth/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth.service';
import { User } from 'src/app/user/models/user-request';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toast: NgToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  gotoRegister() {
    this.router.navigate(['register']);
  }

  gotoUsers() {
    this.router.navigate(['users']);
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      // Create a partial User object with email and password
      const loginUser: Partial<User> = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(loginUser as User)
        .subscribe(
          (user: User) => {
            this.toast.success({ detail: "Success", summary: "Login Successful", duration: 5000 });
            console.log('Login response data:', user);

            // Update the user state
            this.userService.setUserInLocalStorage(user);
            console.log('before navigate')
            // Navigate to dashboard or another appropriate page
            this.router.navigate(['']);
          },
          error => {
            this.toast.error({ detail: "Error", summary: "Login failed", duration: 5000 });
          }
        );
    } else {
      this.toast.error({ detail: "Error", summary: "Please fill in all fields correctly", duration: 5000 });
    }
  }
}
