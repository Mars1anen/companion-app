import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateItemComponent } from './dialog-create-item.component';

describe('DialogCreateItemComponent', () => {
  let component: DialogCreateItemComponent;
  let fixture: ComponentFixture<DialogCreateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
