import { Component, Input, OnInit } from '@angular/core';
import { FireAuthService } from '../fire-auth.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.css']
})
export class StartUpComponent implements OnInit {
  userLoggedIn: boolean;
  userId: string;

  constructor(
    private auth: FireAuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.checkIfLogged()
      .subscribe(resp => {
        if (resp !== null) this.userLoggedIn = true;
        else this.userLoggedIn = false;
        console.log('Firebase responded with ' + this.userLoggedIn);
      });
  }

  changeUser() {
    this.auth.signOut();
    this.router.navigate(['/sign-in']);
  }
}
