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
      email: email,
      name: username,
      counters: {
        accounts: 1,
        items: 0
      }
    }
    this.usersCollection.doc(uid).set(newDoc)
      .then(fulfill => {
        alert('new account was successfulle created in database');
      });
    this.usersCollection.doc(uid).collection('accounts').doc('0').set({
      id: 0,
      name: 'Основной',
      total: 0
    });
  }
  
  createAccount(uid, name) {
    let obs = this.db.doc('users/'+uid).valueChanges();
    let subscription = obs.subscribe((data: any) => {
        let newIndex = data.counters.accounts;
        let oldItemIndex = data.counters.items;
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
              accounts: newIndex,
              items: oldItemIndex
            }
          })
        });
      })
  }

  deleteAccount(uid, index) {
    this.db.doc('users/'+uid).collection('accounts').doc(index.toString()).delete();
  }

  createItem(uid, parentId, name, amount, isIncome) {
    let obs = this.db.doc('users/'+uid).valueChanges();
    let subscription = obs.subscribe((data: any) => {
      let oldAccountIndex = data.counters.accounts;
      let newIndex = data.counters.items;
      if (newIndex === 0) { //create collection if there is none
        this.usersCollection.doc(uid).collection('items').doc('0').set({
          name: 'Placeholder'
        });
      } 
      let itemsRef = this.db.doc('users/'+uid).collection('items');
      itemsRef.doc(newIndex.toString()).set({
        parentId: parentId,
        name: name,
        amount: parseInt(amount, 10),
        income: isIncome
    })
      .then(fulfill => {
        subscription.unsubscribe();
        newIndex += 1;
        this.db.doc('users/'+uid).update({
          counters: {
            accounts: oldAccountIndex,
            items: newIndex
          }
        })
      });
    })
  }
}
