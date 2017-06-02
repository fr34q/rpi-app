import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RadioComponent } from './radio/radio.component';
import { TemperatureComponent } from './temperature/temperature.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'temperature', component: TemperatureComponent },
  { path: 'about', component: AboutComponent }
];

