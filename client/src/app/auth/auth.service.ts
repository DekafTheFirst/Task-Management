// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { User } from '../user/models/user-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:8080";

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

  register(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signup`, user);
  }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/v1/auth/login`, user);
  }

  getTokenFromLocalStorage(): string | null {
    const user = this.localStorageService.get('user');
    return user ? JSON.parse(user).token : null;
  }
}
