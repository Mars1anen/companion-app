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

interface Item {
  name: string,
  income: boolean,
  amount: number,
  parentId: number
}
interface Items extends Array<{}> {
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
          animate(300)
      ])
    ]),
    trigger('normalMode', [
      transition(':enter', [
          style({ padding: '3px 20px 3px 15px' }),
          animate(300)
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
    ])
  ]
})

export class HomeComponent implements OnInit {
  userId: string;
  userName: string;
  accounts;
  items: Items = [];
  itemsSub: Subscription;
  selectedTab = 0;
  deleteMode = false;

  constructor(
    private auth: FireAuthService,
    private storage: FirestoreService,
    private route: ActivatedRoute,
    public dialog:MatDialog) { }

  ngOnInit() {
    this.route.params
      .subscribe(paramObj => {
        this.userId = paramObj.id;
        this.storage.getAccountsForView(this.userId)
          .subscribe((resp: any) => {
            if (resp.name) this.userName = resp.name;
            else {
              this.accounts = resp;
              this.selectedTab = resp[0].id;
              this.itemsSub = this.storage.getItemsForView(this.userId, this.selectedTab)
                .subscribe((resp: any) => {
                  let filter = function(bool) {
                    return function(obj) {
                      if (obj.income === bool) return true;
                      else return false;
                    }
                  };
                  this.items['incomes'] = resp.filter(filter(true));
                  this.items['expenses'] = resp.filter(filter(false));
                })
            }
          })
          
      });

  }

  createAccount(): void {
    let dialogRef = this.dialog.open(DialogCreateAccountComponent, {
      width: '500px',
      height: '350px',
      panelClass:"createModalDialog",
      data: { userId: this.userId }
    });
  }

  deleteTab(index): void {
    this.storage.deleteAccount(this.userId, index);
  }

  selectTab(i) {
    this.selectedTab = i;
    this.itemsSub.unsubscribe();
    this.storage.getItemsForView(this.userId, this.selectedTab)
      .subscribe((resp: any) => {
        let filter = function(bool) {
          return function(obj) {
            if (obj.income === bool) return true;
            else return false;
          }
        };
        this.items['incomes'] = resp.filter(filter(true));
        this.items['expenses'] = resp.filter(filter(false));
      })
  }

  createItem(boolean):void {
    let dialogRef = this.dialog.open(DialogCreateItemComponent, {
      width: '500px',
      height: '500px',
      panelClass:"createModalDialog",
      data: { 
        userId: this.userId,
        parentId: this.selectedTab,
        income: boolean }
    });
  }

  intoDelete() {
    this.deleteMode = !this.deleteMode;
  }

  countUpTotal() {
    let sum = 0;
    this.items.incomes.forEach(obj => sum += obj.amount);
    this.items.expenses.forEach(obj => sum -= obj.amount);
    console.log(sum);
    return sum;
  }
}
