import { Component } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

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
    private storage: FirestoreService,
    private router: Router
  ) {}

  register(form) {
    let email = form.value.email, password = form.value.password, name = form.value.username;
    let uniqueness: boolean;
    let subscription = this.storage.returnUserDataByName(name)
      .subscribe(res => {
        subscription.unsubscribe();
        console.log(res);
        if (res.length > 0) {
          uniqueness = false;
          alert('Username already in use!');
        } else {
          uniqueness = true;
          this.auth.signUp(email, password)
            .then(newUserData => {
              this.storage.createNewUser(newUserData.uid, name, email);
              this.router.navigateByUrl('/' + name);
            });
        }
      }); 
  }
}
