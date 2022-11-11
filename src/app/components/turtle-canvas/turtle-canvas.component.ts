import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { debounce } from './../../scripts/util';
import { TurtleService } from 'src/app/services/turtle/turtle.service';

@Component({
    selector: 'tjs-turtle-canvas',
    templateUrl: './turtle-canvas.component.html',
    styleUrls: ['./turtle-canvas.component.scss']
})
export class TurtleCanvasComponent implements AfterViewInit {
    @ViewChild('host') hostEl!: ElementRef;
    @ViewChild('turtleCanvas') turtleCanvasEl!: ElementRef;
    @ViewChild('gridCanvas') gridCanvasEl!: ElementRef;

    @Output() resize = new EventEmitter();

    width: number = 0;
    height: number = 0;

    fullscreen: boolean = false;
    gridSize = this.turtleService.gridSize;
    drawingSpeed = this.turtleService.drawingSpeed;
    visibility = this.turtleService.visibility;

    constructor(
        private turtleService: TurtleService,
    ) {}

    private readonly _resizeCanvas = () => {
        const turtleCanvasEl = (this.turtleCanvasEl.nativeElement as HTMLCanvasElement);
        turtleCanvasEl.width = window.innerWidth;
        turtleCanvasEl.height = window.innerHeight;
        const gridCanvasEl = (this.gridCanvasEl.nativeElement as HTMLCanvasElement);
        gridCanvasEl.width = window.innerWidth;
        gridCanvasEl.height = window.innerHeight;
        this.resize.emit();
    }
    private _resizeCanvasDebounced = debounce(this._resizeCanvas, 250);
    private _getHostElRect(): DOMRect {
        return (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
    }
    private _updateCanvasViewDims() {
        const { width, height } = this._getHostElRect();
        this.width = Math.round(width);
        this.height = Math.round(height);
    }
    onResize() {
        this._updateCanvasViewDims();
        this._resizeCanvasDebounced();
    }

    ngAfterViewInit(): void {
        //timeout to prevent NG0100 error
        //https://angular.io/errors/NG0100
        setTimeout(() => {
            this._updateCanvasViewDims();
            this._resizeCanvas();
        }, 0);
    }

    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        //timeout to schedule the execution to after the view updates
        setTimeout(() => {
            this._updateCanvasViewDims();
        }, 0);
    }
    changeGridSize() {
        this.turtleService.changeGridSize();
    }
    changeDrawingSpeed() {
        this.turtleService.changeDrawingSpeed();
    }
    toggleVisibility() {
        this.turtleService.toggleVisibility();
    }
}
