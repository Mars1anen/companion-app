import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatDialog } from '@angular/material';
import { DialogAddAttachmentComponent } from '../modals/dialog-add-attachment/dialog-add-attachment.component';
import { AsyncPipe } from '@angular/common';
import { FirestoreService } from '../services/firestore.service';
import { ImgStorageService } from '../services/img-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit, OnChanges {
  @Input()
  selectedTab;
  @Input()
  userName;
  attachments: Array<any>;
  attachmentsSub: Subscription;
  

  constructor(
    public dialog:MatDialog,
    private bucket:ImgStorageService,
    private db: FirestoreService
  ) {
   }

  ngOnInit() {
    this.getAttachments();
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.selectedTab && !changes.selectedTab.firstChange) {
      if (this.attachmentsSub) this.attachmentsSub.unsubscribe();
      this.getAttachments();
    }
  }

  getAttachments() {
    this.attachments = [];
    this.attachmentsSub = this.db.getAttachmentsArray(this.selectedTab)
      .subscribe(attachments => {
        attachments.forEach(obj => {
          let objForDisplay = {};
          objForDisplay['label'] = obj.label;
          this.bucket.getImgUrl(this.userName, this.selectedTab, obj.name)
          .subscribe(url => {
            objForDisplay['url'] = url;
            if (this.checkUniqueness(objForDisplay)) {
              this.attachments.push(objForDisplay);
            }
          });
        })
      });
  }

  deleteAttachment(name) {
    this.bucket.deleteAttachment(this.userName, this.selectedTab, name)
      .subscribe(resp => {
        this.attachmentsSub.unsubscribe();
        this.getAttachments();
      });
  }

  showAttachmentModal() {
    let dialogRef = this.dialog.open(DialogAddAttachmentComponent, {
      width: '700px',
      height: '500px',
      panelClass:"createModalDialog",
      data: { userName: this.userName, account: this.selectedTab }
    });
  }

  checkUniqueness(attachmentObj) {
    let existing = this.attachments;
    let bool = true;
    existing.forEach(obj => {
      if (obj.label === attachmentObj.label || obj.url === attachmentObj.url) bool = false;
    })
    return bool;
  }
}
