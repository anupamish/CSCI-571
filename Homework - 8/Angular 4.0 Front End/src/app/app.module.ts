import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatFormFieldModule,MatInputModule,MatAutocompleteModule,MatOptionModule,MatSlideToggleModule, MatSelectModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';
import { NgxCarouselModule } from 'ngx-carousel';
import { Ng2OrderModule } from 'ng2-order-pipe';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    FacebookModule.forRoot(),
    NgxCarouselModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }

