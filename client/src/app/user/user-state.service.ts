import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { User } from './models/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  user$ = this.userSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  // Manage user data in local storage
  getUserFromLocalStorage(): User | null {
    const userJson = this.localStorageService.get('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  getUserIdFromLocalStorage(): number | null {
    const user = this.getUserFromLocalStorage();
    return user?.id ?? null;
  }

  getTokenFromLocalStorage(): string | null {
    const user = this.getUserFromLocalStorage();
    return user?.token ?? null;
  }

  // Update the BehaviorSubject when user logs in or logs out
  setUserInLocalStorage(user: User): void {
    console.log('user', user)
    this.localStorageService.set('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  removeUserFromLocalStorage(): void {
    this.localStorageService.remove('user');
    this.userSubject.next(null);
  }
}
