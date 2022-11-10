import { Injectable } from '@angular/core';
import { Turtle, TurtleOptions, ColorResolvable, TurtleStep } from 'simple-turtle';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { DownloadService } from './../download/download.service';

type GridSize = 0 | 10 | 25 | 50;
type DrawingSpeed = 1 | 50 | 200 | 500;

@Injectable({
    providedIn: 'root'
})
export class TurtleService {
    private static readonly _defaultCode: string = `
function drawShape(sides, steps) {
    const angle = 360 / sides
    for (let i = 0; i < sides; i++) {
        forward(steps)
        right(angle)
    }
}

const steps = 50
drawShape(3, steps)
drawShape(4, steps)
drawShape(5, steps)
drawShape(6, steps)
drawShape(8, steps)
drawShape(10, steps)
drawShape(12, steps)
`; 

    private _getCodeToLoad(): string {
        const codeFromLS = this.lss.loadString('turtle-codemirror');
        return codeFromLS || TurtleService._defaultCode;
    }

    turtle!: Turtle;
    private _gridSize: GridSize = (this.lss.loadNumber('turtle-grid-size') ?? 0) as GridSize;
    private _gridSizeSubject = new BehaviorSubject(this._gridSize);
    public gridSize = this._gridSizeSubject.asObservable();

    private _drawingSpeed: DrawingSpeed = (this.lss.loadNumber('turtle-drawing-speed') ?? 1) as DrawingSpeed;
    private _drawingSpeedSubject = new BehaviorSubject(this._drawingSpeed);
    public drawingSpeed = this._drawingSpeedSubject.asObservable();

    private _currentCode: string = this._getCodeToLoad();
    private _currentCodeSubject = new BehaviorSubject(this._currentCode);
    public currentCode = this._currentCodeSubject.asObservable();
    
    private _isCodeRunning: boolean = false;
    private _isCodeRunningSubject = new BehaviorSubject(this._isCodeRunning);
    public isCodeRunning = this._isCodeRunningSubject.asObservable();

    constructor(
        private lss: LocalStorageService,
        private downloadService: DownloadService,
    ) { }
    
    create(
        ctx: CanvasRenderingContext2D,
        turtleOptions?: TurtleOptions
    ) {
        this.turtle = new Turtle(ctx, turtleOptions);
    }

    setCode(code: string) {
        this._currentCode = code;
        this._currentCodeSubject.next(code);
    }
    changeGridSize(): void {
        switch (this._gridSize) {
            case 0:
                this._gridSize = 50;
                break;
            case 50:
                this._gridSize = 25;
                break;
            case 25:
                this._gridSize = 10;
                break;
            case 10:
                this._gridSize = 0;
                break;
        }
        this._gridSizeSubject.next(this._gridSize);
        this.lss.save('turtle-grid-size', this._gridSize);
        this.resetCanvas();
    }
    changeDrawingSpeed(): void {
        switch (this._drawingSpeed) {
            case 1:
                this._drawingSpeed = 50;
                break;
            case 50:
                this._drawingSpeed = 200;
                break;
            case 200:
                this._drawingSpeed = 500;
                break;
            case 500:
                this._drawingSpeed = 1;
                break;
        }
        this._drawingSpeedSubject.next(this._drawingSpeed);
        this.turtle.setSpeed(this._drawingSpeed);
        this.lss.save('turtle-drawing-speed', this._drawingSpeed);
    }
    private _drawCorrectGrid(): void {
        this.turtle.instantReset();
        if (!this._gridSize) return;
        this.turtle.drawGrid(this._gridSize);
    }

    resetCanvas(): void {
        this._drawCorrectGrid();
        this.turtle.setSpeed(this._drawingSpeed);
    }
    runCodeTimeout(): void {
        if (this._isCodeRunning) return;
        this._isCodeRunning = true;
        this._isCodeRunningSubject.next(this._isCodeRunning);
        this.resetCanvas();
        //this is for multithreading purposes
        setTimeout(() => {
            this._runCode();
            this._isCodeRunning = false;
            this._isCodeRunningSubject.next(this._isCodeRunning);
            this._saveCodeToLS();
        }, 0);
    }
    private _runCode() {
        //TODO
        try {
            eval(this._currentCode);
        } catch (err: any) {
            const error = err as Error;
            console.error(error.toString());
        }
    }
    private _saveCodeToLS() {
        this.lss.save('turtle-codemirror', this._currentCode);
    }
    downloadCode() {
        this.downloadService.downloadWithWM(this._currentCode, 'turtle code.js');
    }
}