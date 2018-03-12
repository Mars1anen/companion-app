import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  @Input()
  selectedTab;
  @Input()
  userName;
  attachments;

  constructor(
    private bucket: AngularFireStorage
  ) {
   }

  ngOnInit() {
    const ref = this.bucket.ref(this.userName + '/' + this.selectedTab);
    ref.getDownloadURL()
    .subscribe(fls => {
      this.attachments = fls;
      console.log(fls);
    })
  }

    log() {
      console.log(this.attachments);
    }
}
