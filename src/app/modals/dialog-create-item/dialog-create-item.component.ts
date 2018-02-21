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

  createItem(name, amount) {
    let userId = this.data.userId;
    let parentId = this.data.parentId;
    let isIncome = this.data.income;
    console.log(isIncome);

    this.storage.createItem(userId, parentId, name.value, amount.value, isIncome);
  }

  dismissDialog():void {
    this.dialogRef.close();
  }
}
