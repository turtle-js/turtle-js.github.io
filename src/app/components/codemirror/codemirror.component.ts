import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CodemirrorComponent as NgxCodemirrorComponent } from '@ctrl/ngx-codemirror';

@Component({
  selector: 'tjs-codemirror',
  templateUrl: './codemirror.component.html',
  styleUrls: ['./codemirror.component.scss']
})
export class CodemirrorComponent implements AfterViewInit {

    @Input() value!: string;
    @Output() valueChange = new EventEmitter<string>();

    @Input() options!: any;

    @Input() autoFocus: boolean = false;

    @ViewChild('host') hostEl!: ElementRef;
    @ViewChild(NgxCodemirrorComponent) codemirrorEl!: NgxCodemirrorComponent;

    onResize(): void {
        const { width, height } = this._getHostElRect();
        setTimeout(() => {
            this.codemirrorEl.codeMirror!.setSize(width, height);
        }, 0);
    }
    private _getHostElRect(): DOMRect {
        return (this.hostEl.nativeElement as HTMLElement).getBoundingClientRect();
    }

    ngAfterViewInit(): void {
        this.onResize();
    }
}
