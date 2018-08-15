import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fire-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewModesManagerService } from '../services/view-modes-manager.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  animations: [
    trigger('profile-btn', [
      transition(':enter', [
        style({ transform: 'translate(-110px)' }),
        animate('0.5s 500ms', style({ transform: 'translate(0px)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0px)' }),
        animate('0.5s', style({ transform: 'translate(-110px)' }))
      ])
    ]),
    trigger('profile-btn2', [
      transition(':enter', [
        style({ transform: 'translate(-110px)' }),
        animate('0.5s 500ms', style({ transform: 'translate(0px)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(-45px)' }),
        animate('0.5s', style({ transform: 'translate(-110px)' }))
      ])
    ])
  ]
})
export class UserProfileComponent {
  currentViewMode;

  constructor(
    private auth: FireAuthService,
    private vmm: ViewModesManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.vmm.viewMode.subscribe(cvm => this.currentViewMode = cvm); // Subscribe to changes of view modes
  }

  logOut() {
    this.auth.signOut()
      .then(success => {
        this.router.navigateByUrl('');
      })
  }

  accessMenu() {
    this.vmm.switchViewMode();
  }
}
