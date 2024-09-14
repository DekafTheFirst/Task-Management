import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = "http://localhost:8080"

  constructor(private httpClient: HttpClient, private localstorageservice: LocalStorageService, private userService: UserService) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.userService.getTokenFromLocalStorage();
    // console.log('authToken', authToken)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }
  private getStringHeaders(): HttpHeaders {
    const authToken = this.userService.getTokenFromLocalStorage();
    console.log('authToken', authToken)
    return new HttpHeaders({
      'Content-Type': 'text/plain;charset=UTF-8',
      'Authorization': `Bearer ${authToken}`
    });
  }

  createTask(id: number , task: Task): Observable<Object> {
    const headers = this.getHeaders();
    return this.httpClient.post<Object>(`${this.baseUrl}/api/v1/task/createTask/${id}`, task, {headers});
  }

  getAllTask(): Observable<Task[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Task[]>(`${this.baseUrl}/api/v1/task/allTask`, {headers});
  }
  getTaskById(id: number): Observable<Task> {
    const headers = this.getHeaders();
    return this.httpClient.get<Task>(`${this.baseUrl}/api/v1/task/${id}`, {headers});
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.httpClient.patch<Task>(`${this.baseUrl}/api/v1/task/updateTask/${id}`, task, {headers});
  }
  deleteTask(id: number): Observable<string>{
    const headers = this.getStringHeaders();
    return this.httpClient.delete(`${this.baseUrl}/api/v1/task/deleteTask/${id}`, {headers, responseType: 'text'});
  }

  deleteProjectTask(projectId: number, taskId: number): Observable<string> {
    const headers = this.getStringHeaders();
    return this.httpClient.delete(`${this.baseUrl}/api/v1/project/deleteProjectTask/${projectId}/${taskId}`, {headers, responseType: 'text'});
  }

  filterTaskByStatus(status: string): Observable<Task[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('status', status);
    return this.httpClient.get<Task[]>(`${this.baseUrl}/api/v1/task/status`,{params, headers})
  }

  orderTaskByPriority(): Observable<Task[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<Task[]>(`${this.baseUrl}/api/v1/task/order`, {headers});
  }

  searchTask(name: string): Observable<Task[]> {
    const headers = this.getHeaders();
    const params = new HttpParams().set('name', name);
    return this.httpClient.get<Task[]>(`${this.baseUrl}/api/v1/task/search`,{params, headers})
  }


}
