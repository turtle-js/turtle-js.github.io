import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurtleCanvasComponent } from './turtle-canvas.component';

describe('TurtleCanvasComponent', () => {
  let component: TurtleCanvasComponent;
  let fixture: ComponentFixture<TurtleCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurtleCanvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurtleCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
