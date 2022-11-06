import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from './../../scripts/util';
import { TurtleService } from 'src/app/services/turtle/turtle.service';

@Component({
    selector: 'tjs-turtle-canvas',
    templateUrl: './turtle-canvas.component.html',
    styleUrls: ['./turtle-canvas.component.scss']
})
export class TurtleCanvasComponent implements AfterViewInit {
    @ViewChild('host') hostEl!: ElementRef;
    @ViewChild('canvas') canvasEl!: ElementRef;

    @Output() resize = new EventEmitter();

    width: number = 0;
    height: number = 0;

    visibility: boolean = true;
    fullscreen: boolean = false;
    gridSize = this.turtleService.gridSize;

    constructor(
        private turtleService: TurtleService,
    ) {}

    private readonly _onResizeFn = () => {
        const { width, height } = this._getHostElRect();
        this.width = Math.round(width);
        this.height = Math.round(height);
        const canvasEl = (this.canvasEl.nativeElement as HTMLCanvasElement);
        canvasEl.width = width;
        canvasEl.height = height;
        this.resize.emit();
    }
    onResize = debounce(this._onResizeFn, 250);
    private _getHostElRect(): DOMRect {
        return (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._onResizeFn();
        }, 0);
    }

    toggleVisibility() {
        this.visibility = !this.visibility;
    }
    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
    }
    changeGridSize() {
        this.turtleService.changeGridSize();
    }
}
