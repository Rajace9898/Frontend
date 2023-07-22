import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInStatusService {
  loggedinstatus = new BehaviorSubject(false);
  changeLoggedInStatus() {
    if (sessionStorage.getItem('status') === 'employeeActive')
      this.loggedinstatus.next(true);
    else if (sessionStorage.getItem('status') === 'adminActive') {
      this.loggedinstatus.next(true);
    } else {
      this.loggedinstatus.next(false);
    }
  }
  constructor() {}
}
