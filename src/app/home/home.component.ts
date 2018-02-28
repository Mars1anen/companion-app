import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FireAuthService } from '../services/fire-auth.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { MatDialog } from '@angular/material';
import { DialogCreateAccountComponent } from '../modals/dialog-create-account/dialog-create-account.component'
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DialogCreateItemComponent } from '../modals/dialog-create-item/dialog-create-item.component';
import { Observable } from 'rxjs';

interface Item {
  name: string,
  income: boolean,
  amount: number,
  parentId: number
}
export interface Items extends Array<{}> {
  incomes?: Array<Item>,
  expenses?: Array<Item>
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('deleteMode', [
      transition(':enter', [
          style({ padding: '3px 13px' }),
          animate(500)
      ])
    ]),
    trigger('normalMode', [
      transition(':enter', [
          style({ padding: '3px 20px 3px 15px', opacity: '0' }),
          animate(500)
      ])
    ]),
    trigger('itemEnter', [
      transition(':enter', [
          style({ 
            opacity: '0',
            transform: 'translate(-400px)'
         }),
          animate(800)
      ])
    ]),
    trigger('hide', [
      transition(':enter', [
          style({ opacity: '0.5' }),
          animate(600)
      ])
    ]),
  ]
})

export class HomeComponent implements OnInit {
  userId: string;
  userName: string;
  accounts;
  accountsSub: Subscription;
  items: Items = [];
  itemsSub: Subscription;
  selectedTab;
  deleteMode = false;
  total: number;

  constructor(
    private auth: FireAuthService,
    private storage: FirestoreService,
    private route: ActivatedRoute,
    public dialog:MatDialog) { }

  ngOnInit() {
    this.route.params
      .subscribe(paramObj => {
        this.userName = paramObj.username;
        this.accountsSub = this.storage.getAccountsForView(this.userName)
          .subscribe((resp: any) => {
            if (resp.length === 0) {
              this.accounts = [];
              this.selectTab('all');
            } else {        
              this.accounts = resp;
              this.selectTab(resp[0].id);
            }
            console.log(resp);
          }) 
      });
  }

  createAccount(): void {
    this.accountsSub.unsubscribe();
    if (this.itemsSub) this.itemsSub.unsubscribe();

    let dialogRef = this.dialog.open(DialogCreateAccountComponent, {
      width: '500px',
      height: '350px',
      panelClass:"createModalDialog",
      data: { userName: this.userName }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountsSub = this.storage.getAccountsForView(this.userName)
          .subscribe(resp => {
            this.accounts = resp;
            this.selectTab(result);
          })        
      }
    })
  }

  deleteTab(index): void {
    let i = this.accounts.findIndex(element => {
      return element.id === index
    });
    this.accountsSub.unsubscribe();
    this.accounts.splice(i, 1);
    this.storage.deleteAccount(index);
    if (index === this.selectedTab) {
      this.selectTab('all');
    }
  }

  selectTab(i) {
    if (i === 'all') {
      this.selectedTab = 'all';   
      var container = [];
      this.storage.getAllUserAccounts(this.userName) // Get array of Account observables
        .subscribe(accounts => { 
          this.storage.getAllItemsForThisUser(accounts) // Get items by searching each Account's id
            .subscribe(values => {
              container.push(values);
              this.items = this.storage.filterForDisplay(container);
              this.countUpTotal();
            });
        });
    } else {
      this.selectedTab = i;
      if (this.itemsSub) this.itemsSub.unsubscribe();
      this.itemsSub = this.storage.getItemsForView(this.selectedTab)
        .subscribe((resp: any) => {
          this.items = this.storage.filterForDisplay(resp);
          this.countUpTotal();
        })
    }
  }

  createItem(boolean):void {
    let dialogRef = this.dialog.open(DialogCreateItemComponent, {
      width: '500px',
      height: '560px',
      panelClass:"createModalDialog",
      data: {
        accountId: this.selectedTab,
        income: boolean }
    });
  }

  deleteItem(item) {
    this.storage.deleteItem(item.accountId, item.id);
    if (this.selectedTab === 'all') this.selectTab('all');
  }

  intoDelete() {
    this.deleteMode = !this.deleteMode;
  }

  countUpTotal() {
    let sum = 0;
    this.items.incomes.forEach(obj => sum += obj.amount);
    this.items.expenses.forEach(obj => sum -= obj.amount);
    this.total = sum;
  }
}
