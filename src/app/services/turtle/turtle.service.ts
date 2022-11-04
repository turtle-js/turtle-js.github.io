import { Turtle, TurtleOptions, ColorResolvable } from 'simple-turtle';
import { LocalStorageService } from './../local-storage/local-storage.service';

export class TurtleService {
    private static readonly _defaultCode: string = `
function drawShape(sides, steps) {
    const angle = 360 / sides
    for (let i = 0; i < sides; i++) {
        forward(steps)
        right(angle)
    }
}

const steps = 50
drawShape(3, steps)
drawShape(4, steps)
drawShape(5, steps)
drawShape(6, steps)
drawShape(8, steps)
drawShape(10, steps)
drawShape(12, steps)
`; 

    //LS = LocalStorage
    static getCodeToLoad(): string {
        const LS = new LocalStorageService();
        const codeFromLS = LS.loadString('turtle-codemirror');
        return codeFromLS || TurtleService._defaultCode;
    }

    readonly turtle!: Turtle;
    constructor(
        ctx: CanvasRenderingContext2D,
        turtleOptions?: TurtleOptions
    ) {
        this.turtle = new Turtle(ctx, turtleOptions);
    }
    redrawCanvas() {
        this.turtle.drawTurtle();
    }
}