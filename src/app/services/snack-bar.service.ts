import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackBarComponent } from '../modals/snack-bar/snack-bar.component';

@Injectable()
export class SnackBarService {
  snackBarRef:MatSnackBarRef<SnackBarComponent>;
  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message) {
    this.snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {
        message: message
      }
    });
    this.snackBarRef.instance.snackBarRef = this.snackBarRef;
  }
}
