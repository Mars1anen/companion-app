import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAttachmentComponent } from './dialog-add-attachment.component';

describe('DialogAddAttachmentComponent', () => {
  let component: DialogAddAttachmentComponent;
  let fixture: ComponentFixture<DialogAddAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
