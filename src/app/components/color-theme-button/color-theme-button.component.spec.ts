import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorThemeButtonComponent } from './color-theme-button.component';

describe('ColorThemeButtonComponent', () => {
  let component: ColorThemeButtonComponent;
  let fixture: ComponentFixture<ColorThemeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorThemeButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorThemeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
