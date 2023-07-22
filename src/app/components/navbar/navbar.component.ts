import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInStatusService } from 'src/app/services/logged-in-status.service';

import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  disabler = true;
  loggedInStatus: boolean = false;
  ngOnInit() {
    this.loggedinstatus.changeLoggedInStatus();
    this.loggedinstatus.loggedinstatus.subscribe((data) => {
      this.loggedInStatus = data;
    });
  }

  constructor(
    private router: Router,
    private loginService: LoginServiceService,
    private loggedinstatus: LoggedInStatusService
  ) {}

  names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 11];

  login() {
    if (sessionStorage.getItem('status') === 'adminActive') {
      this.router.navigate(['/users']);
    } else if (sessionStorage.getItem('status') === 'employeeActive') {
      this.router.navigate(['/employee', 1]);
    } else {
      this.router.navigate(['/login']);
    }
  }
  logout() {
    sessionStorage.setItem('status', 'inactive');
    this.loginService.logout();
    console.log(sessionStorage.getItem('status'));
  }
}
