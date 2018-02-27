import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { mergeAll, concatAll, flatMap } from 'rxjs/operators';
import { Items } from '../home/home.component';


@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<User>;
  accountsCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) { 
    this.usersCollection = this.db.collection('users');
    this.accountsCollection = this.db.collection('accounts');
  }

  returnUserDataByName(name) { // refactored
    return this.db.collection('users', ref => ref.where('username', '==', name)).valueChanges();
  }

  returnUserDataByEmail(email) { // refactored
    return this.db.collection('users').doc(email).valueChanges();
  }

  getAccountsForView(username) { // refactored
    return this.db.collection('accounts', ref => ref.where('user', '==', username)).valueChanges();
  }

  getItemsForView(accountId) { // refactored
    return this.accountsCollection.doc(accountId).collection('items').valueChanges();
  }

  getAllUserAccounts(username) { // refactored
    return this.db.collection('accounts', ref => ref.where('user', '==', username)).valueChanges(); // filter all accounts by username
  }

  getAllItemsForThisUser(accountsArray) { // refactored
    let accountsCollection = this.accountsCollection;
    let containerObs = Observable.create(function(observer) {
      accountsArray.forEach(account => observer.next(accountsCollection.doc(account.id).collection('items').valueChanges()));
    });
    containerObs = containerObs.flatMap(x => x).concatAll();
    return containerObs;
  }

  createNewUser(uid, username, email) { // refactored
    let newDoc = {
      username: username,
      id: uid
    }
    this.usersCollection.doc(email).set(newDoc)
      .then(fulfill => {
        alert('new account was successfulle created in database');
      });
  }
  
  createAccount(username, name) { // Refactored
    let newAcc = {
      name: name,
      user: username,
      total: 0
    }
    return this.accountsCollection.add(newAcc); 
  }

  deleteAccount(index) { // Refactored
    let accountsRef = this.accountsCollection.doc(index.toString());
    let itemsColRef = accountsRef.collection('items');

    itemsColRef.ref.get()
      .then(ref => {
        let batch = this.db.firestore.batch();
        ref.docs.forEach(document => {
          batch.delete(itemsColRef.doc(document.id).ref);
        });
        batch.commit().then(function() {
          accountsRef.delete();
        })
      })
  }

  createItem(accountId, isIncome, name, amount, date) {
    let newDoc = {
      name: name,
      amount: amount,
      date: date,
      income: isIncome
    };
    this.accountsCollection.doc(accountId).collection('items').add(newDoc)
      .then(result => console.log(result)); // Remove console.log
  }

  filterForDisplay(itemsArray): Items { // refactored
    let f = function(bool) {
      return function(obj) {
        if (obj.income === bool) return true;
        else return false;
      }
    };
    let processed = [];
    processed['incomes'] = itemsArray.filter(f(true));
    processed['expenses'] = itemsArray.filter(f(false));

    return processed;
  }
}
