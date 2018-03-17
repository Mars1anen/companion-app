import { Component, OnInit, AfterViewChecked, Input, ChangeDetectorRef } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FireAuthService } from '../services/fire-auth.service';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { MatDialog } from '@angular/material';
import { DialogCreateAccountComponent } from '../modals/dialog-create-account/dialog-create-account.component'
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DialogCreateItemComponent } from '../modals/dialog-create-item/dialog-create-item.component';
import { Observable } from 'rxjs/Observable';
import { ViewModes, ViewModesManagerService } from '../services/view-modes-manager.service';
import { DialogHelpComponent } from '../modals/dialog-help/dialog-help.component';

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
    ])
  ]
})

export class HomeComponent implements OnInit, AfterViewChecked {
  userId: string;
  userName: string;
  accounts;
  accountsSub: Subscription;
  viewMode: ViewModes;

  items: Items = [];
  itemsSub: Subscription;
  selectedTab;
  deleteMode = false;
  total: number;
  accOverflown: boolean = false;
  sliderPosition = 0;
  sliderPreviousPosition: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private auth: FireAuthService,
    private storage: FirestoreService,
    private vmm: ViewModesManagerService,
    private route: ActivatedRoute,
    public dialog:MatDialog
  ) { 
      this.vmm.viewMode
      .subscribe(vm => {
        this.viewMode = vm;
      });
      this.vmm.total
      .subscribe(total => {
        this.total = total;
      });
     }

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
              this.selectTab('all');
            }
          }) 
      });
  }

  ngAfterViewChecked() {
    let obs = Observable.defer(() => Observable.of(this.checkOverflow()));
    obs.subscribe(result => {
      this.accOverflown = result;
    });
    this.changeDetector.detectChanges();
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

  selectTab(i) {
    this.selectedTab = i;
  }

  deleteTab(index): void {
    let i = this.accounts.findIndex(element => {
      return element.id === index
    });
    this.accountsSub.unsubscribe();
    this.accounts.splice(i, 1);
    this.storage.deleteAccount(index)
      .subscribe(resp => {
        if (index === this.selectedTab) {
          this.selectTab('all');     
        }
      });
  }

  intoDelete() {
    this.deleteMode = !this.deleteMode;
  }

  checkOverflow() {
    let parent = document.querySelector('#navbar').clientWidth;
    let children = document.querySelectorAll('.accounts-panel button');
    let lastButton:any = children[children.length-1];
    return (lastButton.offsetLeft + lastButton.offsetWidth) > parent;
  }

  selectBtn(nextOrPrevious) {
    let i = this.accounts.findIndex(element => {
      return element.id === this.selectedTab;
    });
    let length = this.accounts.length;
    let account;

    if (nextOrPrevious === 'next') {
      if (i < length - 1) {
        this.selectTab(this.accounts[i+1].id);
      } else {
        this.selectTab(this.accounts[0].id);
      }
      this.changeOrder('next');
    } else {
      if (i > 0) {
        this.selectTab(this.accounts[i-1].id);
      } else {
        this.selectTab(this.accounts[length-1].id);
      }
      this.changeOrder('previous');  
    }
  }

  changeOrder(nextOrPrevious) {
    let toBeginning, toEnd, result, length = this.accounts.length;

    if (nextOrPrevious === 'next') {
      toBeginning = this.accounts.slice(1);
      toEnd = this.accounts.slice(0, 1);
    } else {
      toBeginning = this.accounts.slice(length-1);
      toEnd = this.accounts.slice(0, length-1);
    }
    toEnd.unshift(...toBeginning);
    this.accounts = toEnd;
  }

  showHelp() {
    this.dialog.open(DialogHelpComponent, {
      width: '1000px',
      height: '850px',
      panelClass: 'help-modal'
    })
  }
}
/*
let dialogRef = this.dialog.open(DialogCreateAccountComponent, {
  width: '500px',
  height: '350px',
  panelClass:"createModalDialog",
  data: { userName: this.userName }
});*/