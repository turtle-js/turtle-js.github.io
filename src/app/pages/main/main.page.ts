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
    codemirror: string = TurtleService.defaultCode;
    private _wasViewInit = false;
    ngAfterViewInit(): void {
        this._wasViewInit = true;
        this.turtleService = new TurtleService(
            this
                .canvas
                .canvasEl
                .nativeElement
                .getContext('2d', {
                    willReadFrequently: true,
                }),
            {
                defaultColor: 'white',
                autoDraw: true,
                turtleSizeModifier: 3,
            }
        );
        this.turtleService.expose(window);

        this._runCode(true);
    }
    onCanvasResize() {
        if (!this._wasViewInit) return;
        this.turtleService.redrawCanvas();
    }
    onRunClick() {
        this._runCode();
    }
    private _runCode(firstRun?: true) {
        if (!firstRun) this.turtleService.reset();
        try {
            eval(this.codemirror);
        } catch (err: any) {
            const error = err as Error;
            console.log(error.toString());
        }
    }
}
