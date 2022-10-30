import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'mat-icon',
    template: `
    <span class="material-symbols-outlined">
        <ng-content></ng-content>
    </span>`,
    styleUrls: ['./mat-icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MatIconComponent {}