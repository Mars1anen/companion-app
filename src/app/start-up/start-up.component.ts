import { Component, Input, OnInit } from '@angular/core';
import { FireAuthService, User } from '../services/fire-auth.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.css']
})
export class StartUpComponent implements OnInit {
  userLoggedIn: boolean;
  user: User;

  constructor(
    private auth: FireAuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.checkIfLogged()
      .subscribe(response => {
        if (response !== null) {
          let user: User = {
            id: response.uid,
            email: response.email,
            name: response.displayName || 'Anonymous'
          };
          this.userLoggedIn = true;
          this.user = user;
        } else this.userLoggedIn = false;
      });
  }

  changeUser() {
    this.auth.signOut();
    this.router.navigate(['/sign-in']);
  }
}
