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
        this.turtleService = new TurtleService(
            this.canvas
                .canvasEl
                .nativeElement
                .getContext('2d', {
                    willReadFrequently: true,
                }),
            {
                defaultColor: 'white',
                autoDraw: true,
                turtleSizeModifier: 3,
                disableWrapping: true,
            }
        );
        this.turtleService.expose(window);

        this._runCode();
        this._wasViewInit = true;
    }
    onCanvasResize = debounce(() => {
        if (!this._wasViewInit) return;
        this.turtleService.redrawCanvas();
        this._runCode();
    }, 250);
    onRunClick() {
        this._runCode();
    }
    private _runCode() {
        if (this._wasViewInit) this.turtleService.reset();
        try {
            eval(this.codemirror);
        } catch (err: any) {
            const error = err as Error;
            console.log(error.toString());
        }
    }
    
}

function debounce(func: (e?: Event) => unknown, delay: number = 100) {
    let timer: any;
    return function (event?: Event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay, event);
    };
}