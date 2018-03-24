import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help-page-six',
  templateUrl: './page-six.component.html',
  styleUrls: ['./page-six.component.css']
})
export class PageSixComponent implements OnInit {

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
