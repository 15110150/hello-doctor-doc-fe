import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoneComponent } from './list-done.component';

describe('ListDoneComponent', () => {
  let component: ListDoneComponent;
  let fixture: ComponentFixture<ListDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
