import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'dialog-create-account',
  templateUrl: './dialog-create-account.component.html',
  styleUrls: ['./dialog-create-account.component.css']
})
export class DialogCreateAccountComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogCreateAccountComponent>,
              private storage: FirestoreService) { }
  
  createAccount(name) {
    let userName = this.data.userName;
    this.storage.createAccount(userName, name.value) 
      .then(ref => {
        this.storage.accountsCollection.doc(ref.id).update({
          id: ref.id
        });
        this.dialogRef.close(ref.id);
      }) ;
  }

  dismissDialog():void {
    this.dialogRef.close();
  }
}
