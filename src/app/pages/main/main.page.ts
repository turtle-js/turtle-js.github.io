import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TurtleService } from 'src/app/services/turtle/turtle.service';
import { TurtleCanvasComponent } from 'src/app/components/turtle-canvas/turtle-canvas.component';
import { DownloadService } from './../../services/download/download.service';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { ThemeService } from './../../services/theme/theme.service';

@Component({
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements AfterViewInit {
    @ViewChild(TurtleCanvasComponent) canvas!: TurtleCanvasComponent;

    turtleService!: TurtleService;

    theme = this.themeService.simpleTheme;
    codemirror: string = TurtleService.getCodeToLoad();

    isRunning: boolean = false;
    constructor(
        private downloadService: DownloadService,
        private lss: LocalStorageService,
        private themeService: ThemeService,
    ) {}

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

        this._runCodeTimeout();
        this._wasViewInit = true;
    }
    private _runCodeTimeout() {
        this.turtleService.reset();
        this.isRunning = true;
        //this is for multithreading purposes
        setTimeout(() => {
            this._runCode();
            this.isRunning = false;
        }, 0);
    }
    private _runCode() {
        try {
            eval(this.codemirror);
        } catch (err: any) {
            const error = err as Error;
            console.error(error.toString());
        }
    }
    onCanvasResize = debounce(() => {
        if (!this._wasViewInit) return;
        this.turtleService.reset();
        this._runCode();
    }, 250);
    private _saveCodemirrorToLS = debounce(() => {
        this.lss.save('turtle-codemirror', this.codemirror);
    }, 500);
    onCodemirrorChange(value: string) {
        this.codemirror = value;
        this._saveCodemirrorToLS();
    }
    onRunClick() {
        if (this.isRunning) return;
        this._runCodeTimeout();
    }
    onDownloadClick() {
        this.downloadService.download(this._getCodeWithWatermark(), 'turtle code.js');
    }
    private _getCodeWithWatermark() {
        return `/*
 * Edited using TurtleJS
 * https://turtle-js.github.io
 */

${this.codemirror.trimStart()}`;
    }
}

function debounce(func: (e?: Event) => unknown, delay: number = 100) {
    let timer: any;
    return function (event?: Event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay, event);
    };
}