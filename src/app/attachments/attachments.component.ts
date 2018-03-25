import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatDialog } from '@angular/material';
import { DialogAddAttachmentComponent } from '../modals/dialog-add-attachment/dialog-add-attachment.component';
import { AsyncPipe } from '@angular/common';
import { FirestoreService } from '../services/firestore.service';
import { ImgStorageService } from '../services/img-storage.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css'],
  animations: [
    trigger('cards', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.2s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AttachmentsComponent implements OnInit, OnChanges {
  @Input()
  selectedTab;
  @Input()
  userName;
  attachments: Array<any>;
  attachmentsSub: Subscription;
  deleteMode = false;
  accountsMap = {};

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
    if (this.selectedTab !== 'all') {
      this.attachmentsSub = this.db.getAttachmentsArray(this.selectedTab)
        .subscribe(attachments => {
          attachments.forEach(obj => {
            let objForDisplay = {};
            objForDisplay['name'] = obj.name;
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
    } else {
      let container = [];
      let accountsSub = this.db.getAllUserAccounts(this.userName) // Get array of Account observables
        .subscribe(accounts => {
          accounts.forEach((acc: any) => {
            this.accountsMap[acc.id] = acc.name;
          });
          let attachmentsSub = this.db.getAllAttachmentsForThisUser(accounts)
            .subscribe(attachment => {
              let objForDisplay = {};
              objForDisplay['name'] = attachment.name;
              objForDisplay['label'] = attachment.label;
              objForDisplay['account'] = attachment.account;
              this.bucket.getImgUrl(this.userName, attachment.account, attachment.name)
                .subscribe(url => {
                  objForDisplay['url'] = url;
                  if (this.checkUniqueness(objForDisplay)) {
                    this.attachments.push(objForDisplay);
                  }
                });
            })
        })
    }
  }

  deleteAttachment(name) {
    if (this.selectedTab === 'all') {
      let acc = this.attachments.find(el => el.name === name)['account'];
      this.bucket.deleteAttachment(this.userName, acc, name)
        .subscribe(resp => {
          if (this.attachmentsSub) this.attachmentsSub.unsubscribe();
          this.getAttachments();
        });
    } else {
      this.bucket.deleteAttachment(this.userName, this.selectedTab, name)
        .subscribe(resp => {
          if (this.attachmentsSub) this.attachmentsSub.unsubscribe();
          this.getAttachments();
        });
    }
  }

  showAttachmentModal() {
    let dialogRef = this.dialog.open(DialogAddAttachmentComponent, {
      width: '700px',
      height: '500px',
      panelClass:"createModalDialog",
      data: { userName: this.userName, account: this.selectedTab }
    });
  }

  intoDelete() {
    this.deleteMode = !this.deleteMode;
  }

  checkUniqueness(attachmentObj) {
    let existing = this.attachments;
    let bool = true;
    existing.forEach(obj => {
      if (obj.label === attachmentObj.label || obj.url === attachmentObj.url) bool = false;
    })
    return bool;
  }

  getAccountNameById(id) {
    return this.accountsMap[id];
  }
}
