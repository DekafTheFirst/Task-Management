// src/app/user/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './models/user-request';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { Task } from '../task/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080";
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  user$ = this.userSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private getHeaders(): HttpHeaders {
    const authToken = this.getTokenFromLocalStorage();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }

  // User State Management
  private getUserFromLocalStorage(): User | null {
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

  setUserInLocalStorage(user: User): void {
    console.log('user', user);
    this.localStorageService.set('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  removeUserFromLocalStorage(): void {
    this.localStorageService.remove('user');
    this.userSubject.next(null);
  }

  // HTTP Operations
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/v1/user/allUsers`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/api/v1/user/${id}`, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.httpClient.patch<User>(`${this.baseUrl}/api/v1/user/editUser/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.baseUrl}/api/v1/user/deleteUser/${id}`, { headers: this.getHeaders() });
  }

  // Additional methods for tasks and projects
  getCurrentUser(): Observable<User> {
    const userId = this.getUserIdFromLocalStorage();
    console.log('userId', userId);
    if (userId) {
      return this.getUserById(userId);
    } else {
      throw new Error('User ID not found');
    }
  }
}
