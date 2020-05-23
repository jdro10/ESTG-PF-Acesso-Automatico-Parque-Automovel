import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkmodeComponent } from './parkmode.component';

describe('ParkmodeComponent', () => {
  let component: ParkmodeComponent;
  let fixture: ComponentFixture<ParkmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
