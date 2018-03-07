import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  @Input()
  selectedTab;

  constructor() { }

  ngOnInit() {
  }

  log() {
    console.log(this.selectedTab)
  }
}
