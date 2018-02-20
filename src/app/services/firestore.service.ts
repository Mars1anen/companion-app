import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  getDataForView(uid) {
    let itemDoc = this.db.doc('users/'+uid);
    return itemDoc.valueChanges();
  }
  createNewUser(uid, username, email) {
    let newDoc = {
      accounts: [],
      email: email,
      items: [],
      name: username,
      notes: []
    }
    let usersCollection = this.db.collection('users');
    usersCollection.doc(uid).set(newDoc)
      .then(fulfill => {
        alert('new account was successfulle created in database');
      });
  }
}
