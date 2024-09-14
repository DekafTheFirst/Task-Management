// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.userService.user$.subscribe((subscribedUser)=>{
      // console.log('user subscribed', subscribedUser)
    })

    return this.userService.user$.pipe(
      map(user => { 
        // console.log('user', user)
        return !!user 
      }), // Check if user is logged in
      tap(isLoggedIn => {
        // console.log('isLoggedIn', isLoggedIn)
        if (!isLoggedIn) {
          this.router.navigate(['/login']); // Redirect to login if not logged in
        }
      })
    );
  }
}
