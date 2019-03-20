import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  constructor(public auth: AuthService) {
  }

  logout() {
    this.auth.logout();
  }
}
