import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'dialog-create-item',
  templateUrl: './dialog-create-item.component.html',
  styleUrls: ['./dialog-create-item.component.css']
})
export class DialogCreateItemComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCreateItemComponent>,
    private storage: FirestoreService) { }

  createItem(name, amount, date) {
    let accountId = this.data.accountId;
    let isIncome = this.data.income;
    let parsedAmount = parseInt(amount.value, 10);

    this.storage.createItem(accountId, isIncome, name.value, parsedAmount, date.value);
  }

  dismissDialog():void {
    this.dialogRef.close();
  }
}
