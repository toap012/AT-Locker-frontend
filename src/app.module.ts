import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app-root/app.component';
import { AppHeaderComponent } from './app/cmps/app-header/app-header.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoeIndexComponent } from './app/pages/shoe-index/shoe-index.component';
import { ShoeListComponent } from './app/cmps/shoe-list/shoe-list.component';
import { ShoePreviewComponent } from './app/cmps/shoe-preview/shoe-preview.component';
import { HomePageComponent } from './app/pages/home-page/home-page.component';
import { AboutPageComponent } from './app/pages/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ShoeIndexComponent,
    ShoeListComponent,
    ShoePreviewComponent,
    HomePageComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
