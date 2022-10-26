import { Turtle, TurtleOptions, ColorResolvable } from 'simple-turtle';

export class TurtleService {
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
        return this.turtle.right(-degrees);
    }
    left(degrees: number): Turtle {
        return this.turtle.left(-degrees);
    }
    angle(degrees: number): Turtle {
        return this.turtle.setAngle(-degrees);
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
}