import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconComponent } from './mat-icon.component';

describe('MatIconComponent', () => {
  let component: MatIconComponent;
  let fixture: ComponentFixture<MatIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
