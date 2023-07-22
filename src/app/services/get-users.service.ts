import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Employee } from '../model/employee';
import { EmployeeRequest } from '../model/userRequest';
import { Employee1 } from '../model/employee1';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  url = 'http://localhost:8080/KamarchariF1-web/employee/getAll';

  constructor(
    private loginService: LoginServiceService,
    private http: HttpClient
  ) {}
  // gets all the employee
  get() {
    return this.http.get<Employee[]>(this.url);
  }
  // gets employee with the matching id
  getById(id: number) {
    return this.http.get<Employee>(
      'http://localhost:8080/KamarchariF1-web/employee/' + id
    );
  }
  // sets the employee status to false
  delete(id: any) {
    return this.http.delete(
      'http://localhost:8080/KamarchariF1-web/employee/' + id
    );
  }
  // updates the employee details

  update(user: Employee) {
    return this.http.post(
      'http://localhost:8080/KamarchariF1-web/employee/update',
      user
    );
  }
  // creates the employee
  create(user: EmployeeRequest) {
    // return this.http.post(
    //   'http://localhost:8080/KamarchariF1-web/employee/create',
    //   user
    // );
    return this.http.post(
      'http://localhost:8080/KamarchariF1-web/employee/create',
      user
    );
  }
}
