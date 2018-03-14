import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-help',
  templateUrl: './dialog-help.component.html',
  styleUrls: ['./dialog-help.component.css']
})
export class DialogHelpComponent implements OnInit {
pages = [0, 1, 2, 3];
currentPage = 0;

  constructor() { }

  ngOnInit() {
  }

  choosePage(page) {
    this.currentPage = page;
  }
}
