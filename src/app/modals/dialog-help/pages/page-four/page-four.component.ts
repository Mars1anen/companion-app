import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help-page-four',
  templateUrl: './page-four.component.html',
  styleUrls: ['./page-four.component.css']
})
export class PageFourComponent implements OnInit {

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
