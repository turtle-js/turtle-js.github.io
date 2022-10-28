import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TurtleService } from 'src/app/services/turtle/turtle.service';
import { TurtleCanvasComponent } from 'src/app/components/turtle-canvas/turtle-canvas.component';

@Component({
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements AfterViewInit {
    @ViewChild(TurtleCanvasComponent) canvas!: TurtleCanvasComponent;

    turtleService!: TurtleService;

    theme = 'darkplus';
    codemirror: string = `
forward(100)`;
    ngAfterViewInit(): void {
        this.turtleService = new TurtleService(
            this.canvas.canvasEl.nativeElement.getContext('2d'),
            {
                defaultColor: 'white',
                autoDraw: true,
                turtleSizeModifier: 3,
            }
        );
        this.turtleService.expose(window);
    onCanvasResize() {
        this.turtleService.redrawCanvas();
    }
    }
}
