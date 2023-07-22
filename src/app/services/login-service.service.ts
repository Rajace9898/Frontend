import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EmployeeLogin } from '../model/userlogin';
import { LoginResponse } from '../model/login-response';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  PATH_OF_API = 'http://localhost:8080';
  login(data: EmployeeLogin) {
    return this.httpClient.post<LoginResponse>(
      'http://localhost:8080/KamarchariF1-web/Login/do',
      data
    );
  }
  logout() {
    this.router.navigate(['/login']);
  }
 
}
