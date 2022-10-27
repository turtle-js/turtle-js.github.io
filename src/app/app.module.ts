import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPage } from './pages/main/main.page';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ColorThemeButtonComponent } from './components/color-theme-button/color-theme-button.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainPage
        ColorThemeButtonComponent
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
