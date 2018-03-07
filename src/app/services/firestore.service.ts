import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/Observable';
import { mergeAll, concatAll, flatMap } from 'rxjs/operators';
import { Items } from '../home/home.component';
import { SnackBarService } from './snack-bar.service';


@Injectable()
export class FirestoreService {
  usersCollection: AngularFirestoreCollection<User>;
  accountsCollection: AngularFirestoreCollection<any>;

  constructor(
      private db: AngularFirestore,
      private snackbar: SnackBarService
    ) { 
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
    return this.accountsCollection.doc(accountId).collection('items', ref => ref.orderBy('date')).valueChanges();
  }

  getAllUserAccounts(username) { // refactored
    return this.db.collection('accounts', ref => ref.where('user', '==', username)).valueChanges(); // filter all accounts by username
  }

  getAllItemsForThisUser(accountsArray) { // refactored
    let accountsCollection = this.accountsCollection;
    let containerObs = Observable.create(function(observer) {
      accountsArray.forEach(account => observer.next(accountsCollection.doc(account.id).collection('items', ref => ref.orderBy('date')).valueChanges()));
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
        //
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

    let notifier = Observable.create(observer => {
      itemsColRef.ref.get()
      .then(ref => {
        let batch = this.db.firestore.batch();
        ref.docs.forEach(document => {
          batch.delete(itemsColRef.doc(document.id).ref);
        });
        batch.commit().then(function() {
          accountsRef.delete();
          observer.next('Completed');
        })
      })
    });
    return notifier;
  }

  createItem(accountId, isIncome, name, amount, date, marker?) {
    let newDoc = {
      name: name,
      amount: amount,
      date: date,
      income: isIncome,
      accountId: accountId
    };
    if (marker && marker !== 'none') newDoc['marker'] = marker;
    this.accountsCollection.doc(accountId).collection('items').add(newDoc)
      .then(result => {
        this.accountsCollection.doc(accountId).collection('items').doc(result.id).update({
          id: result.id
        })
      });
  }
  
  deleteItem(accountId, itemId) {
    this.accountsCollection.doc(accountId).collection('items').doc(itemId).delete()
      .then(
        result => {
          this.snackbar.openSnackBar('Элемент удалён!');
      },
        error => {
          this.snackbar.openSnackBar('Произошла ошибка.');
        }
    )
  }

  filterForDisplay(itemsArray): Items { // refactored
    let sortingF = function(a, b) {
      return parseInt(a.date, 10) - parseInt(b.date, 10);
    }
    let f = function(bool) {
      return function(obj) {
        if (obj.income === bool) return true;
        else return false;
      }
    };
    itemsArray.sort(sortingF);
    let processed = [];
    processed['incomes'] = itemsArray.filter(f(true));
    processed['expenses'] = itemsArray.filter(f(false));

    return processed;
  }
}
