import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!this.userService.getUserIdFromLocalStorage();
    
    if (isLoggedIn) {
      // Redirect to dashboard if the user is already logged in
      this.router.navigate(['']);
      return false;
    }
    
    // Allow access if the user is not logged in
    return true;
  }
}
