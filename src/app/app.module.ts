import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPage } from './pages/main/main.page';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatIconComponent } from './components/mat-icon/mat-icon.component';
import { ColorThemeButtonComponent } from './components/color-theme-button/color-theme-button.component';
import { CodemirrorComponent } from './components/codemirror/codemirror.component';
import { TurtleCanvasComponent } from './components/turtle-canvas/turtle-canvas.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainPage,
        MatIconComponent,
        ColorThemeButtonComponent,
        CodemirrorComponent,
        TurtleCanvasComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CodemirrorModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
