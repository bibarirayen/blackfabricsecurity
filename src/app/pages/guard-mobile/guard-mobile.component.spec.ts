import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardMobileComponent } from './guard-mobile.component';

describe('GuardMobileComponent', () => {
  let component: GuardMobileComponent;
  let fixture: ComponentFixture<GuardMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
