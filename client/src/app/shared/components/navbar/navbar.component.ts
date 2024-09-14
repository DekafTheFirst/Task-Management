import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/models/user-request';

@Component({
  selector: 'app-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  userId: number | null = null;
  isLoggedIn = false;
  user: User | null = null;
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
      // console.log('isLoggedIn', this.isLoggedIn)
      this.userId = user?.id;
    });
    // console.log('userId', this.userId)
  }

  gotoDashboard(id: number) {
    console.log(id);
    this.router.navigate(['']);
  }

  userLogout() {
    // this.localStorageService.remove('user');
    this.userService.removeUserFromLocalStorage(); // Clear user state
    this.router.navigate(['login']);
  }
}
