import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbChooseModeComponent } from './mb-choose-mode.component';

describe('MbChooseModeComponent', () => {
  let component: MbChooseModeComponent;
  let fixture: ComponentFixture<MbChooseModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbChooseModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbChooseModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
