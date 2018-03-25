import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
imageUrl: String;

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: any
  ) {
    this.imageUrl = data.url;
   }

  ngOnInit() {
  }

}
