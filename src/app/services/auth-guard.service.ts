import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FireAuthService } from '../services/fire-auth.service';
import { Observable } from 'rxjs/Observable';
import { query } from '@angular/animations';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: FireAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.auth.checkIfLogged()
        .map(resp => {
          if (resp !== null) return true;
          else {
            this.router.navigate(['/sign-in'], { queryParams: { 'returnUrl': route.params.username } });
            alert('Looks like you have to sign-in first');
            return false;
          }
        }).first();
  }
}