import { AfterViewInit, Component, ViewChild } from '@angular/core';
import * as CodeMirror from 'codemirror';
import { TurtleCanvasComponent } from 'src/app/components/turtle-canvas/turtle-canvas.component';
import { TurtleService } from 'src/app/services/turtle/turtle.service';
import { debounce } from './../../scripts/util';
import { ThemeService } from './../../services/theme/theme.service';

@Component({
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements AfterViewInit {
    @ViewChild(TurtleCanvasComponent) canvas!: TurtleCanvasComponent;

    theme = this.themeService.simpleTheme;
    currentCode = this.turtleService.currentCode;

    isRunning = this.turtleService.isCodeRunning;

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
            this.turtleService.runCodeTimeout();
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
        private turtleService: TurtleService,
        private themeService: ThemeService,
    ) {}

    private _wasViewInit = false;
    ngAfterViewInit(): void {
        this.turtleService.create(
            this.canvas
                .turtleCanvasEl
                .nativeElement
                .getContext('2d', {
                    willReadFrequently: true,
                }),
            this.canvas
                .gridCanvasEl
                .nativeElement
                .getContext('2d', {
                    willReadFrequently: true,
                }),
            {
                defaultColor: 'white',
                autoDraw: true,
                disableWrapping: true,
            }
        );
        this.turtleService.turtle.expose(window);

        this._wasViewInit = true;
    }
    onCanvasResize = debounce(() => {
        if (!this._wasViewInit) return;
        this.turtleService.resetCanvas();
    }, 250);
    onCodemirrorChange(value: string) {
        this.turtleService.setCode(value);
    }
    onRunClick() {
        this.turtleService.runCodeTimeout();
    }
    onDownloadClick() {
        this.turtleService.downloadCode();
    }
}