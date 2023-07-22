import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { UserLogin } from 'src/app/model/userlogin';
import { LoginResponse } from 'src/app/model/login-response';
import Swal from 'sweetalert2';
import { TYPE } from 'src/app/values.constants';
import { LoggedInStatusService } from 'src/app/services/logged-in-status.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userId!:number;
  aid!: number;
  eNumber!:string;
  ePassoword!: string;
  Loginstatus = 'login';
  BlockStatus = true;
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  ReloginStatus = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService,
    private loggedinStatus: LoggedInStatusService,
    private route:ActivatedRoute
  ) {}
 

  ngOnInit() {
    this.loggedinStatus.changeLoggedInStatus();
  }
  employeeLoginData: UserLogin = new UserLogin();

  registrationForm = this.formBuilder.group({
    number: ['', [Validators.required]],
    employeePassword: ['', [Validators.required, Validators.minLength(3)]],
    
  });
   get number(){
    return this.registrationForm.get('number');
   }

  get employeePassword() {
    return this.registrationForm.get('employeePassword');
  }
  OnSignup() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    // this.aid = Number(this.registrationForm.value.id);
    this.eNumber=String(this.registrationForm.value.number);
    this.ePassoword = String(this.registrationForm.value.employeePassword);
    this.employeeLoginData.password = this.ePassoword;
    // this.employeeLoginData.number=this.eNumber;
    // this.employeeLoginData.id = this.aid;
    this.loginService.login(this.employeeLoginData).subscribe({
      next: (data: LoginResponse) => {
        //----------------------------------for providing access cases----------------------------------
        if (data.message == 'activeAdmin') {
          sessionStorage.setItem('status', 'adminActive');
          console.log(sessionStorage.getItem('status'));

          this.router.navigate(['/users']);
        } else if (data.message == 'trueEmployee') {
          // console.log(sessionStorage.getItem('status'));
          // console.log(this.registrationForm.value.id);

          sessionStorage.setItem('status', 'employeeActive');
          // console.log(sessionStorage.getItem('status'));
          this.router.navigate(['/employee']);
        } else if (data.message == 'inactiveAdmin') {
          Swal.fire({
            title: 'ADMIN inactive',
            text: 'your admin status has been blocked',
            icon: TYPE.WARNING,
            confirmButtonText: 'Cool',
          });

        }
        // -------------------------------for restricting access--------------------------------------------
        else if (data.message == 'incorrect id or username') {
          Swal.fire({
            title: 'UserName not found!',
            text: 'Your username is incorrect',
            icon: TYPE.ERROR,
            confirmButtonText: 'Try again?',
          });
          this.router.navigate(['/login']);
        } else if (data.message == 'passwordIncorrect') {
          Swal.fire({
            title: 'Password didnt matched',
            text: 'incorrect password',
            icon: TYPE.ERROR,
            confirmButtonText: 'Try again!!',
          });
          this.router.navigate(['/login']);
        } else if (data.message == 'inactiveEmployee') {
          Swal.fire({
            title: 'Employee not Active!',
            text: 'You have been deactivated',
            icon: TYPE.ERROR,
            confirmButtonText: 'Okay?',
          });
          this.router.navigate(['/login']);
        } else if (data.message == 'passwordIncorrect') {
          Swal.fire({
            title: 'Incorrect password!',
            text: 'Do you want to try again',
            icon: TYPE.ERROR,
            confirmButtonText: 'okay',
          });
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'you are not allowed',
            icon: TYPE.ERROR,
            confirmButtonText: 'Dont try again',
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('error occured');
      },
    });
  }
}
