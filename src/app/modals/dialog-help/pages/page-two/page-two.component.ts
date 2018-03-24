import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.css']
})
export class PageTwoComponent implements OnInit {

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
