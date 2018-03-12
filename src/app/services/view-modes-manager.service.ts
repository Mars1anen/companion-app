import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject, BehaviorSubject } from 'rxjs';

export enum ViewModes {
  budget = 1,
  attachments = 2
}

@Injectable()
export class ViewModesManagerService {
   _viewMode: ViewModes = ViewModes.budget;
  viewModeUpdater: Subject<any>;
  _total: number;
  totalCounter: Subject<any>;

  constructor() {
    this.viewModeUpdater = new BehaviorSubject(this._viewMode);
    this.totalCounter = new BehaviorSubject(this._total);
   }

  switchViewMode() {
    var m = this._viewMode;
    if (m === 1) this._viewMode = 2;
    else this._viewMode = 1;
    this.viewModeUpdater.next(this._viewMode);
  }

  get viewMode() {
    return this.viewModeUpdater;
  }

  get total() {
    return this.totalCounter;
  }

  emitTotal(sum) {
    this._total = sum;
    this.totalCounter.next(this._total);
  }
}
