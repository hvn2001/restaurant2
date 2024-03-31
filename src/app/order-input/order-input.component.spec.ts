import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInputComponent } from './order-input.component';

describe('OrderInputComponent', () => {
  let component: OrderInputComponent;
  let fixture: ComponentFixture<OrderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
