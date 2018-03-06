import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    private auth: FireAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  logOut() {
    this.auth.signOut()
      .then(success => {
        this.router.navigateByUrl('');
      })
  }
}
