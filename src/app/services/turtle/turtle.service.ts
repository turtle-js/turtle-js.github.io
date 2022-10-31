import { Turtle, TurtleOptions, ColorResolvable } from 'simple-turtle';
import { LocalStorageService } from './../local-storage/local-storage.service';

export class TurtleService {
    private static readonly _defaultCode: string = `
function drawShape(sides, steps) {
    const angle = 360 / sides;
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
    forward(steps: number): Turtle {
        return this.turtle.forward(steps);
    }
    backward(steps: number): Turtle {
        return this.turtle.forward(-steps);
    }
    right(degrees: number): Turtle {
        return this.turtle.right(degrees);
    }
    left(degrees: number): Turtle {
        return this.turtle.left(degrees);
    }
    angle(degrees: number): Turtle {
        return this.turtle.setAngle(degrees);
    }
    show(): Turtle {
        return this.turtle.show();
    }
    hide(): Turtle {
        return this.turtle.hide();
    }
    clear(): Turtle {
        return this.turtle.clear();
    }
    reset(): Turtle {
        return this.turtle.reset();
    }
    penUp(): Turtle {
        return this.turtle.putPenUp();
    }
    penDown(): Turtle {
        return this.turtle.putPenDown();
    }
    goTo(x: number, y: number): Turtle {
        return this.turtle.goto(x, y);
    }
    color(color: ColorResolvable): Turtle {
        return this.turtle.setColor(color);
    }
    width(width: number): Turtle {
        return this.turtle.setWidth(width);
    }
    expose(obj: any) {
        obj['forward'] = this.forward.bind(this);
        obj['backward'] = this.backward.bind(this);
        obj['left'] = this.left.bind(this);
        obj['right'] = this.right.bind(this);
        obj['angle'] = this.angle.bind(this);
        obj['show'] = this.show.bind(this);
        obj['hide'] = this.hide.bind(this);
        obj['clear'] = this.clear.bind(this);
        obj['reset'] = this.reset.bind(this);
        obj['penUp'] = this.penUp.bind(this);
        obj['penDown'] = this.penDown.bind(this);
        obj['goTo'] = this.goTo.bind(this);
        obj['color'] = this.color.bind(this);
        obj['width'] = this.width.bind(this);
    }
    redrawCanvas() {
        this.turtle.draw();
    }
}