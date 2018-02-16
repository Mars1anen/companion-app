import { Component } from '@angular/core';
import { FireAuthService } from '../fire-auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private auth: FireAuthService) { }

  logIn(form) {
    let email = form.value.email, password = form.value.password;
    this.auth.signIn(email, password)
      .then(success => {
        alert('You successfully logged in');
      });
  }
}
