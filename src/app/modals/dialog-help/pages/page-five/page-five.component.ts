import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help-page-five',
  templateUrl: './page-five.component.html',
  styleUrls: ['./page-five.component.css']
})
export class PageFiveComponent implements OnInit {

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
