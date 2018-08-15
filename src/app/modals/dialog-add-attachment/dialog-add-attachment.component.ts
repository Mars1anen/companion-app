import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ImgStorageService } from '../../services/img-storage.service';
import { FirestoreService } from '../../services/firestore.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-dialog-add-attachment',
  templateUrl: './dialog-add-attachment.component.html',
  styleUrls: ['./dialog-add-attachment.component.css']
})
export class DialogAddAttachmentComponent implements OnInit {
  attachmentChosen = false;
  attachment: File;

  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: any,
    private dialogRef: MatDialogRef<DialogAddAttachmentComponent>,
    private bucket: ImgStorageService,
    private db: FirestoreService,
    private snackbar: SnackBarService
  ) { }

  ngOnInit() {
  }

  inputChanged(evt) {
    let validFormats = ["image/gif", "image/jpeg", "image/png"];
    let file = evt.currentTarget.files[0];

    if (validFormats.includes(file.type)) { // Check file extension
      this.attachmentChosen = true;
      this.attachment = file;
    }
  }

  submit(label) {
    this.db.checkUniqueAttachmentName(this.data.account, this.attachment.name) // Check existence of such attachment for this account
    .get()
    .then(docShapshot => {
      if (docShapshot.exists) {
        this.snackbar.openSnackBar('Это вложение уже существует');
      } else {
        this.bucket.uploadAttachment(this.data.userName, this.data.account, this.attachment, label);
      }
    })
    this.dialogRef.close();
  }
}
