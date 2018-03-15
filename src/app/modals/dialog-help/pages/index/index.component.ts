import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'help-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  chapter: number;

  constructor() { }

  ngOnInit() {
    this.chapter = 1;
  }
  
  selectChapter(number) {
    this.chapter = number;
  }
}
