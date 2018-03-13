import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { SnackBarService } from './snack-bar.service';
import { FirestoreService } from './firestore.service';

@Injectable()
export class ImgStorageService {

  constructor(
    private bucket: AngularFireStorage,
    private snackbar: SnackBarService,
    private db: FirestoreService
  ) { }

  uploadAttachment(userName, account, file, label) {
    let path = userName + '/' + account + '/' + file.name;
    let task = this.bucket.upload(path, file);
    task.percentageChanges().subscribe(percent => {
      if (percent == 100) {
        this.snackbar.openSnackBar('Вложение успешно добавлено');
        this.db.writeNewAttachment(account, file.name, label);
      }
    })
  }

  getImgUrl(userName, account, name) {
    const ref = this.bucket.ref(userName + '/' + account + '/' + name);
    return ref.getDownloadURL();
  }

  deleteAttachment(userName, account, name) {
    let ref = this.bucket.ref(userName + '/' + account + '/' + name);

    this.db.deleteFromAttachments(account, name);
    return ref.delete();
  }

}
