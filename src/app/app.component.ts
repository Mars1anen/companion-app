import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireAuthService } from './fire-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userLoggedIn: boolean;

  constructor(private auth: FireAuthService) {}

  ngOnInit() {
    this.auth.checkIfLogged(function(user) {
      if (user) this.userLoggedIn = true;
      else this.userLoggedIn = false;
      console.log(user);
      console.log(this.userLoggedIn);
    });
  }

  signOut() {
    this.auth.signOut()
      .then(success => {
        alert('Successfully logged out');
      })
  }
}
