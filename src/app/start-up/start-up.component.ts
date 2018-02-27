import { Component, Input, OnInit } from '@angular/core';
import { FireAuthService, User } from '../services/fire-auth.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { FirestoreService } from '../services/firestore.service';

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
    private router: Router,
    private storage: FirestoreService) { }

  ngOnInit() {
    this.auth.checkIfLogged()
      .subscribe(response => {
        if (response !== null) {
          this.storage.returnUserDataByEmail(response.email)
            .subscribe((getName: any) => {
              this.userLoggedIn = true;
              let user: User = {
                id: response.uid,
                email: response.email,
                name: getName.username
              };
              this.user = user;
              console.log(user);
            }); 
        } else this.userLoggedIn = false;
      });
  }

  changeUser() {
    this.auth.signOut();
    this.router.navigate(['/sign-in']);
  }
}
