import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TurtleService } from './../../services/turtle/turtle.service';

@Component({
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements AfterViewInit {
    @ViewChild('canvas') canvas!: ElementRef;

    turtleService!: TurtleService;

    codemirror: string = `export class Country {
    static get(code: ISOCountryCode | ISOCountryCode3): CountryInfo
    static get(code: string): CountryInfo | null {
        if (code.match(/[A-Z]{3}/)) {
            let foundCountry = countryInfo.find(item => item.code3 === code);
            if (foundCountry) return foundCountry;
        }
        let foundCountry = countryInfo.find(item => item.code === code);
        if (foundCountry) return foundCountry;
        return null;
    }
    static getAll() {
        return [...countryInfo];
    }
    static getAllFromRegion(region: WorldRegion) {
        return countryInfo.filter(item => item.region.includes(region));
    }
    static getAllSovereign() {
        return countryInfo.filter(item => item.sovereign);
    }
}`;

    constructor() { }

    ngAfterViewInit(): void {
        this.turtleService = new TurtleService((this.canvas.nativeElement).getContext('2d'), {
            defaultColor: 'black',
        });
        this.turtleService.expose(window);
    }
}
