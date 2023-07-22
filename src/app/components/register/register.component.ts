import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeRequest } from 'src/app/model/userRequest';
import { Employee1 } from 'src/app/model/employee1';
import { GetUsersService } from 'src/app/services/get-users.service';
import { LoggedInStatusService } from 'src/app/services/logged-in-status.service';

import { PasswordValidator } from 'src/app/validators/Password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  Employee: EmployeeRequest = new EmployeeRequest();
  constructor(
    private formBuilder: FormBuilder,
    private userService: GetUsersService,
    private router: Router,
    private loggedinStatus: LoggedInStatusService
  ) {}
  // user:User=new User("nabin","pass","pass");

  ngOnInit() {
    this.loggedinStatus.changeLoggedInStatus();
  }
  registrationForm = this.formBuilder.group(
    {
      userName: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber:['',[Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirmPassword: ['',[Validators.required,Validators.minLength(9)]],
    },
    { validator: PasswordValidator }
  );

  get userName() {
    return this.registrationForm.get('userName');
  }

  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
  get phoneNumber(){
    return this.registrationForm.get('phoneNumber');
  }

  onSubmit() {
    this.Employee.employeeName = this.userName?.value;
    this.Employee.employeePassword = this.password?.value;
    this.Employee.employeeNumber=this.phoneNumber?.value;
    this.userService.create(this.Employee).subscribe(
      (data:any) => {
        console.log(data);
        console.log(data.id);
        if(sessionStorage.getItem('status')==='inactive'){
          this.router.navigate(['/login',{id:data.id}]);
        }
        else{
          this.router.navigate(['/users']);
        }
        
        
        // sessionStorage.setItem('status', 'employeeActive');
        // this.router.navigate(['/login',{id:data.}])
      },
      (error) => {
        console.log(error);
      }
    );
    onKeyDown(event: KeyboardEvent): void {
      if(this.mobileNumber.value.length===0){
        this.characterCount=0;
      }
      
      if (this.characterCount >= 10 && event.key !== 'Backspace') {
        event.preventDefault();
        return;
      }
      if (event.key === 'Backspace' && this.characterCount > 0) {
        this.characterCount--;
      } else if (event.key !== 'Backspace') {
        this.characterCount++;
      }
      // this.characterCount++;
      if (this.characterCount >= 10) {
        this.isInputDisabled = true;
      }else {
        this.isInputDisabled = false;
      }
    }
    

  }
}
