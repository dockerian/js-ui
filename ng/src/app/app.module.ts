import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppLinkModule } from '../appLink/appLink.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppLinkModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
