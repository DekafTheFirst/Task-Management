import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskstatusComponent } from './view-taskstatus.component';

describe('ViewTaskstatusComponent', () => {
  let component: ViewTaskstatusComponent;
  let fixture: ComponentFixture<ViewTaskstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskstatusComponent]
    });
    fixture = TestBed.createComponent(ViewTaskstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
