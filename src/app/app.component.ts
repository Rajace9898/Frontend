import { Component } from '@angular/core';
import { LoggedInStatusService } from './services/logged-in-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private loggedinstatus:LoggedInStatusService,private router:Router){}
  ngOnInit(){
    this.loggedinstatus.changeLoggedInStatus();
    if(sessionStorage.getItem('status')==='employeeActive'){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/users']);
    }
  }
  title = 'Karam-chari';
}
