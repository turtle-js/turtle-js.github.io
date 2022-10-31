import { Injectable, Renderer2, OnInit, Inject, RendererFactory2 } from '@angular/core';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

export type ColorTheme = 'light' | 'dark';
export type ColorThemeOption = 'system' | ColorTheme;

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _theme!: ColorThemeOption;
    private _themeSubject = new BehaviorSubject<ColorThemeOption>(this._theme);
    public theme = this._themeSubject.asObservable();
    private _simpleThemeSubject = new BehaviorSubject<ColorTheme>(this._themeSimple);
    public simpleTheme = this._simpleThemeSubject.asObservable();

    private _bodyClass?: string;

    private renderer!: Renderer2;

    constructor(
        private localStorageService: LocalStorageService,
        private rendererFactory: RendererFactory2,
    ) {
        this.renderer = this.rendererFactory.createRenderer(document.body, null);

        let themeFromLS = this.localStorageService.loadString('theme') as ColorThemeOption | null;
        if (!themeFromLS) {
            this._theme = 'system';
        }
        else {
            this._theme = themeFromLS;
        }
        this._onChange();
        this._setBodyClass();
    }

    static readonly allThemes = [
        'dark',
        'light',
    ];
    static themeToSimple(theme: ColorThemeOption): ColorTheme {
        switch (theme) {
            case 'system':
                if (!window.matchMedia || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return 'dark';
                }
                return 'light';
        }
        return theme;
    }
    private get _themeSimple(): ColorTheme {
        return ThemeService.themeToSimple(this._theme);
    }
    private _setBodyClass() {
        //get class
        const classToSet = 'theme-' + this._themeSimple;
        //find out which class to (not) remove and update <body>
        const allClasses = ThemeService.allThemes.map(cls => 'theme-' + cls);
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
    nextTheme() {
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
        this._onChange();
        this._setBodyClass();
    }
    private _onChange() {
        this._themeSubject.next(this._theme);
        this._simpleThemeSubject.next(this._themeSimple);
        this.localStorageService.save('theme', this._theme);
    }
}
