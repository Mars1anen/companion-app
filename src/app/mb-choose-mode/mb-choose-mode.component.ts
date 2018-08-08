import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewModesManagerService } from '../services/view-modes-manager.service';

@Component({
  selector: 'app-mb-choose-mode',
  templateUrl: './mb-choose-mode.component.html',
  styleUrls: ['./mb-choose-mode.component.css']
})
export class MbChooseModeComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MbChooseModeComponent>,
    public ViewModes : ViewModesManagerService
  ) {
   }

  viewMode = this.data.viewMode;

  setViewMode(Id) {
    if (this.viewMode === Id)
      this.dialogRef.close();
    else
      this.dialogRef.close(Id);
      this.ViewModes.switchViewMode()
  }
}
