import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookingComponent } from './list-booking.component';

describe('ListBookingComponent', () => {
  let component: ListBookingComponent;
  let fixture: ComponentFixture<ListBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
