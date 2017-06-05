import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MaterialModule } from './modules/material.module';
import { ChartModule } from 'angular2-highcharts';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RadioComponent } from './radio/radio.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { RecentChartComponent } from './temperature/recentChart/recentChart.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    RadioComponent,
    TemperatureComponent,
    RecentChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
