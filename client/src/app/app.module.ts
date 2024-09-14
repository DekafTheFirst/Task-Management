import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

import { NgToastModule } from 'ng-angular-popup';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserTaskComponent } from './user/components/user-task/user-task.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { EditUserComponent } from './user/components/edit-user/edit-user.component';
import { CreateTaskComponent } from './task/components/create-task/create-task.component';
import { TaskListComponent } from './task/components/task-list/task-list.component';
import { ViewTaskComponent } from './task/components/view-task/view-task.component';
import { UpdateTaskComponent } from './task/components/update-task/update-task.component';
import { ViewTaskstatusComponent } from './task/components/view-taskstatus/view-taskstatus.component';
import { OrderTaskpriorityComponent } from './task/components/order-taskpriority/order-taskpriority.component';
import { SearchTaskComponent } from './task/components/search-task/search-task.component';
import { TaskTableComponent } from './task/components/task-table/task-table.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    EditUserComponent,
    DashboardComponent,
    NavbarComponent,
    CreateTaskComponent,
    TaskListComponent,
    ViewTaskComponent,
    UpdateTaskComponent,
    ViewTaskstatusComponent,
    OrderTaskpriorityComponent,
    SearchTaskComponent,
    TaskTableComponent,
    SuccessModalComponent,
    UserTaskComponent,
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,

  ],
  providers: [UserService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
