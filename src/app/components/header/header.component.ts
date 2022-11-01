import { Component } from '@angular/core';
import packageJson from '../../../../package.json';

@Component({
    selector: 'tjs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    readonly version: string = packageJson.version;
    readonly isBeta = this.version.charAt(0) == '0';
}
