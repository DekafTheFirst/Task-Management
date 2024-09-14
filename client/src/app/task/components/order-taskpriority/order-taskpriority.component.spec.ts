import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTaskpriorityComponent } from './order-taskpriority.component';

describe('OrderTaskpriorityComponent', () => {
  let component: OrderTaskpriorityComponent;
  let fixture: ComponentFixture<OrderTaskpriorityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTaskpriorityComponent]
    });
    fixture = TestBed.createComponent(OrderTaskpriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
