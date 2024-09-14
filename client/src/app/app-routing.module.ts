import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { EditUserComponent } from './user/components/edit-user/edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './task/components/create-task/create-task.component';
import { TaskListComponent } from './task/components/task-list/task-list.component';
import { ViewTaskComponent } from './task/components/view-task/view-task.component';
import { UpdateTaskComponent } from './task/components/update-task/update-task.component';
import { ViewTaskstatusComponent } from './task/components/view-taskstatus/view-taskstatus.component';
import { OrderTaskpriorityComponent } from './task/components/order-taskpriority/order-taskpriority.component';
import { SearchTaskComponent } from './task/components/search-task/search-task.component';
import { UserTaskComponent } from './user/components/user-task/user-task.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AlreadyLoggedInGuard } from './auth/guards/alreadyLoggedIn.guard';

const routes: Routes = [
  // Public routes that don't require authentication
  {
    path: "register", component: RegisterComponent, canActivate: [AlreadyLoggedInGuard]
  },
  {
    path: "login", component: LoginComponent, canActivate: [AlreadyLoggedInGuard]
  },

  // Authenticated routes are grouped under a parent route
  {
    path: "",
    canActivate: [AuthGuard], // AuthGuard applies to all child routes
    children: [
      { path: "", component: DashboardComponent }, // Home page (authenticated)
      { path: "users", component: UserListComponent },
      { path: "edit-user/:id", component: EditUserComponent },
      { path: "user-task-list/:id", component: UserTaskComponent },
      { path: "create-task", component: CreateTaskComponent },
      { path: "allTask", component: TaskListComponent },
      { path: "view-task/:id", component: ViewTaskComponent },
      { path: "update-task/:id", component: UpdateTaskComponent },
      { path: "sortTask", component: ViewTaskstatusComponent },
      { path: "orderTask", component: OrderTaskpriorityComponent },
      { path: "searchTask", component: SearchTaskComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
