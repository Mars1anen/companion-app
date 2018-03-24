import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.css']
})
export class PageOneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toTop(section:HTMLElement) {
    let timerId = setInterval(() => {
      if (section.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.scrollTop < 5) {
        clearTimeout(timerId);
      } else {
        section.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.scrollTop = section.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.scrollTop - 5;
      }
    }, 1);
  }
}
