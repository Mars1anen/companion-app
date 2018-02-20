import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateAcoountComponent } from './dialog-create-acoount.component';

describe('DialogCreateAcoountComponent', () => {
  let component: DialogCreateAcoountComponent;
  let fixture: ComponentFixture<DialogCreateAcoountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateAcoountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateAcoountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
