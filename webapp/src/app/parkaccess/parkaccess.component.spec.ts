import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkaccessComponent } from './parkaccess.component';

describe('ParkaccessComponent', () => {
  let component: ParkaccessComponent;
  let fixture: ComponentFixture<ParkaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkaccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
