import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FireAuthService } from '../fire-auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: FireAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let obs = Observable.create(observer => {
      this.auth.checkIfLogged()
        .subscribe(resp => {
          if (resp !== null) observer.next(true);
          else {
            this.router.navigateByUrl('/start');
            observer.next(false);
          }
        })
    });
    return obs;
  }
}
