import { Component } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(
    private auth: FireAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: FirestoreService
  ) { }

  logIn(form) {
    let email = form.value.email, password = form.value.password;
    this.auth.signIn(email, password)
      .then(success => {
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.storage.returnUserDataByEmail(success.email)
            .subscribe((resp: any) => {
              this.router.navigateByUrl('/'+ resp.username);
            });
        }
      });
  }
}
