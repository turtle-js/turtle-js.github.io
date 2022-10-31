import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './../../services/theme/theme.service';


@Component({
    selector: 'tjs-color-theme-button',
    templateUrl: './color-theme-button.component.html',
    styleUrls: ['./color-theme-button.component.scss']
})
export class ColorThemeButtonComponent {
    theme = this.themeService.theme;

    constructor(
        private themeService: ThemeService
    ) {}
    
    nextTheme() {
        this.themeService.nextTheme();
    }
}
