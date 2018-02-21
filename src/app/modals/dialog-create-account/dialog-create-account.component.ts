import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'dialog-create-account',
  templateUrl: './dialog-create-account.component.html',
  styleUrls: ['./dialog-create-account.component.css']
})
export class DialogCreateAccountComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private storage: FirestoreService) { }

  ngOnInit() {
  }
  
  createAccount(name) {
    let userId = this.data.userId;
    this.storage.createAccount(userId, name.value);
  }
}
