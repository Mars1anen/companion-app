import { Component } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public email;
  public password;

  constructor(
    private auth: FireAuthService,
    private storage: FirestoreService) {
  }

  register(form) {
    let email = form.value.email, password = form.value.password, name = form.value.username;
    this.auth.signUp(email, password)
      .then(newUserData => {
        alert('New account was successfully created!');
        this.storage.createNewUser(newUserData.uid, name, email);
      });
      
  }
}
