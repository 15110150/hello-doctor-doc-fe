import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCancelComponent } from './list-cancel.component';

describe('ListCancelComponent', () => {
  let component: ListCancelComponent;
  let fixture: ComponentFixture<ListCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
