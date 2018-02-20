import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FireAuthService } from '../services/fire-auth.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { MatDialog } from '@angular/material';
import { DialogCreateAccountComponent } from '../modals/dialog-create-account/dialog-create-account.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string;
  userName: string;
  accounts;
  items;
  selectedTab = 1;

  constructor(
    private auth: FireAuthService,
    private storage: FirestoreService,
    private route: ActivatedRoute,
    public dialog:MatDialog) { }

  ngOnInit() {
    this.route.params
      .subscribe(paramObj => {
        this.userId = paramObj.id;
        this.storage.getDataForView(this.userId)
          .subscribe((resp: any) => {
            console.log(resp.items);
            this.accounts = resp.accounts;
            this.items = resp.items;
            this.userName = resp.name;
          })
      });
  }

  createAccount(): void {
    let dialogRef = this.dialog.open(DialogCreateAccountComponent, {
      width: '500px',
      height: '300px',
      panelClass:"createModalDialog"
    });
  }
}
