import { Injectable } from '@angular/core';

declare global {
    interface Window {
        turtlejs: {
            detectInfiniteLoop: (identifier: number) => boolean;
        }
    }
}

type InfiniteLoopDetectionIdentifier = {
    identifier: number;
    finished: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CodeAnalyticsService {
    readonly identifiers: InfiniteLoopDetectionIdentifier[] = [];
    readonly TIMER_VALUE_DEFAULT = 2_200;

    constructor() {
        window.turtlejs = {
            detectInfiniteLoop: (id: number): boolean => {
                const idObj = this.identifiers.find(storedId => storedId.identifier == id);
                console.log(idObj?.identifier);
                if (idObj) return idObj.finished;
                const newIdObj = { identifier: id, finished: false };
                this.identifiers.push(newIdObj);
                setTimeout(() => {
                    newIdObj.finished = true;
                    console.log('timeout finished for', newIdObj);
                }, this.TIMER_VALUE_DEFAULT);
                console.log('created object with id', id);
                return false;
            }
        }
    }
}
