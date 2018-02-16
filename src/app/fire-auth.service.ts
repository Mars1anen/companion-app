import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Promise } from 'q';

@Injectable()
export class FireAuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  checkIfLogged(nextOrObserver) {
    return this.afAuth.auth.onAuthStateChanged(nextOrObserver);
  }
}
