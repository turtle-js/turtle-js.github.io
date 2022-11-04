import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TurtleService } from 'src/app/services/turtle/turtle.service';
import { TurtleCanvasComponent } from 'src/app/components/turtle-canvas/turtle-canvas.component';
import { DownloadService } from './../../services/download/download.service';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { ThemeService } from './../../services/theme/theme.service';
import * as CodeMirror from 'codemirror';
import { debounce } from './../../scripts/util';

@Component({
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements AfterViewInit {
    @ViewChild(TurtleCanvasComponent) canvas!: TurtleCanvasComponent;

    turtleService!: TurtleService;

    theme = this.themeService.simpleTheme;
    codemirror: string = TurtleService.getCodeToLoad();

    isRunning: boolean = true;

    savingText: string = '';
    private _savingTimeout?: NodeJS.Timeout;

    readonly extraKeysMap = {
        'Tab': (cm: any) => {
            const spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
        },
        'Ctrl-S': (cm: any) => {
            // Do nothing. Just stop the default action.
        },
        'Shift-Alt-A': (cm: any) => {
            cm.toggleComment();
        },
        'Ctrl-Alt-R': (cm: any) => {
            this._runCodeTimeout();
        },
        'Alt-B': (cm: any) => {
            const line = cm.getLine(cm.getCursor().line);
            cm.replaceSelection('\n' + line);
        },
        'Alt-Down': (cm: any) => {
            const cursor = cm.getCursor();
            const lineNum = cursor.line;
            const line1 = cm.getLine(lineNum);
            const line2 = cm.getLine(lineNum + 1);
            cm.replaceRange(line2 + '\n' + line1 + '\n', new CodeMirror.Pos(lineNum, 0), CodeMirror.Pos(lineNum + 2, 0));
            cursor.line++;
            cm.setCursor(cursor);
        },
        'Alt-Up': (cm: any) => {
            const cursor = cm.getCursor();
            const lineNum = cursor.line;
            const line1 = cm.getLine(lineNum);
            const line2 = cm.getLine(lineNum - 1);
            cm.replaceRange(line1 + '\n' + line2 + '\n', new CodeMirror.Pos(lineNum + 1, 0), CodeMirror.Pos(lineNum - 1, 0));
            cursor.line--;
            cm.setCursor(cursor);
        },
    }

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
        this.turtleService.turtle.expose(window);

        this._runCodeTimeout();
        this._wasViewInit = true;
    }
    private _runCodeTimeout() {
        this.turtleService.turtle.reset();
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
        this.turtleService.turtle.reset();
        this._runCode();
    }, 250);
    private _saveCodemirrorToLS = debounce(() => {
        this.lss.save('turtle-codemirror', this.codemirror);
        this.savingText = 'Saved!';
        this._savingTimeout = setTimeout(() => {
            this.savingText = '';
        }, 3000);
    }, 500);
    onCodemirrorChange(value: string) {
        this.codemirror = value;
        this.savingText = 'Saving...';
        clearTimeout(this._savingTimeout);
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