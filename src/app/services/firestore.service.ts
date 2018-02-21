import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) { 
    this.usersCollection = this.db.collection('users');
  }

  getAccountsForView(uid) {
    let userObs = this.db.doc('users/'+uid).valueChanges();
    let accountsObs = this.db.doc('users/'+uid).collection('accounts').valueChanges(); 
    let result = userObs.merge(accountsObs);
    return result;
  }

  getItemsForView(uid, parentId) {
    let itemsObs = this.db.doc('users/'+uid).collection('items', ref => ref.where('parentId', '==', parentId)).valueChanges();
    return itemsObs;
  }

  createNewUser(uid, username, email) {
    let newDoc = {
      accounts: [],
      email: email,
      items: [],
      name: username,
      notes: []
    }
    this.usersCollection.doc(uid).set(newDoc)
      .then(fulfill => {
        alert('new account was successfulle created in database');
      });
  }
  
  createAccount(uid, name) {
    let obs = this.db.doc('users/'+uid).valueChanges();
    let subscription = obs.subscribe((data: any) => {
        let newIndex = data.counters.accounts;
        let accountsRef = this.db.doc('users/'+uid).collection('accounts');
        accountsRef.doc(newIndex.toString()).set({
          id: newIndex,
          name: name,
          total: 0
      })
        .then(fulfill => {
          subscription.unsubscribe();
          newIndex += 1;
          this.db.doc('users/'+uid).update({
            counters: {
              accounts: newIndex
            }
          })
        });
      })
  }

  deleteAccount(uid, index) {
    this.db.doc('users/'+uid).collection('accounts').doc(index.toString()).delete();
  }
}
