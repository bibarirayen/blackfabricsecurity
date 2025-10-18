import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrajectsComponent } from './manage-trajects.component';

describe('ManageTrajectsComponent', () => {
  let component: ManageTrajectsComponent;
  let fixture: ComponentFixture<ManageTrajectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTrajectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrajectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
