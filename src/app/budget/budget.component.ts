import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { Items } from '../home/home.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { DialogCreateItemComponent } from '../modals/dialog-create-item/dialog-create-item.component';
import { ViewModesManagerService } from '../services/view-modes-manager.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  animations: [
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
    ])
  ]
})
export class BudgetComponent implements OnChanges {
  @Input()
  selectedTab;
  @Input()
  userName;
  accountsSub: Subscription;
  items: Items = [];
  itemsSub: Subscription;
  total: number;

  constructor(
    private storage: FirestoreService,
    public dialog:MatDialog,
    private vmm: ViewModesManagerService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedTab) this.selectTab(changes.selectedTab.currentValue);
  }

  selectTab(i) {
    if (i === 'all') {
      this.selectedTab = 'all';   
      var container = [];
      this.accountsSub = this.storage.getAllUserAccounts(this.userName) // Get array of Account observables
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
      height: '500px',
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

  countUpTotal() {
    let sum = 0;
    this.items.incomes.forEach(obj => sum += obj.amount);
    this.items.expenses.forEach(obj => sum -= obj.amount);
    this.total = sum;
    this.vmm.emitTotal(sum);
  }
}
