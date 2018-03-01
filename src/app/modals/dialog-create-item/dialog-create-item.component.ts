import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FirestoreService } from '../../services/firestore.service';

interface Marker {
  name: string,
  color: string,
  hex: string
}

@Component({
  selector: 'dialog-create-item',
  templateUrl: './dialog-create-item.component.html',
  styleUrls: ['./dialog-create-item.component.css']
})
export class DialogCreateItemComponent {
  markers: Marker[] = [
    {
      name: 'Красный',
      color: 'red',
      hex: '#ed1c24',
    },
    {
      name: 'Синий',
      color: 'blue',
      hex: '#0066b3',
    },
    {
      name: 'Желтый',
      color: 'yellow',
      hex: '#fff200',
    },
    {
      name: 'Фиолетовый',
      color: 'purple',
      hex: '#5c2d91',
    },
    {
      name: 'Зелёный',
      color: 'green',
      hex: '#00a65d',
    },
    {
      name: 'Оранжевый',
      color: 'orange',
      hex: '#f58220',
    },
  ];
  itemMarker: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCreateItemComponent>,
    private storage: FirestoreService) { }

  createItem(name, amount, date) {
    let accountId = this.data.accountId;
    let isIncome = this.data.income;
    let parsedAmount = parseInt(amount.value, 10);

    this.storage.createItem(accountId, isIncome, name.value, parsedAmount, date.value, this.itemMarker);
  }

  dismissDialog():void {
    this.dialogRef.close();
  }
}
