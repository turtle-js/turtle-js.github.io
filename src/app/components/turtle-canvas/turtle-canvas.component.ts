import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from './../../scripts/util';

@Component({
    selector: 'tjs-turtle-canvas',
    templateUrl: './turtle-canvas.component.html',
    styleUrls: ['./turtle-canvas.component.scss']
})
export class TurtleCanvasComponent implements AfterViewInit {
    @ViewChild('host') hostEl!: ElementRef;
    @ViewChild('canvas') canvasEl!: ElementRef;

    @Output() resize = new EventEmitter();

    onResize = debounce(() => {
        const { width, height } = this._getHostElRect();
        const canvasEl = (this.canvasEl.nativeElement as HTMLCanvasElement);
        canvasEl.width = width;
        canvasEl.height = height;
        this.resize.emit();
    }, 250);
    private _getHostElRect(): DOMRect {
        return (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
    }

    ngAfterViewInit(): void {
        this.onResize();
    }
}
