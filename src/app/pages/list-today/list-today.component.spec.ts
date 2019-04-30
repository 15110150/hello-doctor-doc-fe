import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTodayComponent } from './list-today.component';

describe('ListTodayComponent', () => {
  let component: ListTodayComponent;
  let fixture: ComponentFixture<ListTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
