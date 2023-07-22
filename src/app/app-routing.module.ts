import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { ReactivateComponent } from './components/reactivate/reactivate.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeGuard } from './guards/employee.guard';

const routes: Routes = [
  {
    path: 'employee/:id',
    component: EmployeeComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [EmployeeGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'login/:id',
    component: LoginComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'user',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reactivate',
    component: ReactivateComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
}
