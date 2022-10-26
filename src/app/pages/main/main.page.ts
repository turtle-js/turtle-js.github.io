import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TurtleService } from './../../services/turtle/turtle.service';

@Component({
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef;

    turtleService!: TurtleService;

    theme = 'darkplus';
    codemirror: string = `import { Game } from './board.js';

let figureData = {
}
let playerData = {
    name: 'joker876',
    color: 'blue',
    opponents: [
        {
            name: 'foo',
            color: 'red',
        },
        {
            name: 'bar',
            color: 'yellow',
        },
        {
            name: 'baz',
            color: 'green',
        },
    ]
}
let game = new Game(183486, 'M', {}, playerData);
game.board.prependTo(document.body);`;

    constructor() { }

    ngAfterViewInit(): void {
        this.turtleService = new TurtleService((this.canvas.nativeElement).getContext('2d'), {
            defaultColor: 'black',
        });
        this.turtleService.expose(window);
    }
}
