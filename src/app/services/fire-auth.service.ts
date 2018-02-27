import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

export interface User {
  id: string;
  email: string;
  name?: string;
}

@Injectable()
export class FireAuthService {
  authState;

  constructor(public afAuth: AngularFireAuth) {
  }

  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
  
  checkIfLogged() {
    return this.afAuth.authState;
  }
}
