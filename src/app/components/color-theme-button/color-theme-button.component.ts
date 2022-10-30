import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';

type ColorTheme = 'light' | 'dark';
type ColorThemeOption = 'system' | ColorTheme;

@Component({
    selector: 'tjs-color-theme-button',
    templateUrl: './color-theme-button.component.html',
    styleUrls: ['./color-theme-button.component.scss']
})
export class ColorThemeButtonComponent implements OnInit {
    private _theme!: ColorThemeOption;
    private _themeSubject = new Subject<ColorThemeOption>();
    public theme = this._themeSubject.asObservable();

    static readonly allThemes = [
        'dark',
        'light',
    ];

    private _bodyClass!: string;

    constructor(
        private localStorageService: LocalStorageService,
        private renderer: Renderer2
    ) { }

    public get themeClass(): ColorTheme {
        let cls: ColorTheme;
        switch (this._theme) {
            case 'system':
                if (!window.matchMedia || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    cls = 'dark';
                }
                else {
                    cls = 'light';
                }
                break;
            default:
                cls = this._theme;
                break;
        }
        return cls;
    }
    public get getTheme(): ColorThemeOption {
        return this._theme;
    }

    ngOnInit(): void {
        let themeFromLS = this.localStorageService.load('theme') as ColorThemeOption | null;
        if (!themeFromLS) {
            this._theme = 'system';
            this.saveToLS();
            return;
        }
        else {
            this._theme = themeFromLS;
        }
        this._themeSubject.next(this._theme);
        this._setBodyClass();
    }
    private _setBodyClass() {
        //get class
        const classToSet = 'theme-' + this.themeClass;
        //find out which class to (not) remove and update <body>
        const allClasses = ColorThemeButtonComponent.allThemes.map(cls => 'theme-' + cls);
        const clsIndex = allClasses.indexOf(classToSet);
        allClasses.splice(clsIndex, 1);
        for (const cls of allClasses) {
            this.renderer.removeClass(document.body, cls);
        }
        //add the correct class to <body>
        if (this._bodyClass != classToSet) {
            this.renderer.addClass(document.body, classToSet);
            this._bodyClass = classToSet;
        }
    }
    changeTheme() {
        switch (this._theme) {
            case 'system':
                this._theme = 'dark';
                break;
            case 'dark':
                this._theme = 'light';
                break;
            case 'light':
                this._theme = 'system';
                break;
        }
        this.saveToLS();
        this._setBodyClass();
    }
    saveToLS() {
        this.localStorageService.save('theme', this._theme);
    }
}
