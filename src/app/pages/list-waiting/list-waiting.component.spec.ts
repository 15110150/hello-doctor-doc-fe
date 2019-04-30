import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWaitingComponent } from './list-waiting.component';

describe('ListWaitingComponent', () => {
  let component: ListWaitingComponent;
  let fixture: ComponentFixture<ListWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
