import { Component } from '@angular/core';
import { FireAuthService } from '../fire-auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public email;
  public password;

  constructor(private auth: FireAuthService) {
  }

  register(form) {
    let email = form.value.email, password = form.value.password;
    this.auth.signUp(email, password)
      .then(success => {
        alert('New account was successfully logged in!');
      });
      
  }
}
