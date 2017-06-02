import { NgModule } from '@angular/core'

import {
    MdToolbarModule, 
    MdSidenavModule, 
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdCardModule,
    MdProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
      MdToolbarModule, 
      MdSidenavModule, 
      MdButtonModule,
      MdListModule,
      MdIconModule,
      MdCardModule,
      MdProgressSpinnerModule
      ],
  exports: [
      MdToolbarModule, 
      MdSidenavModule, 
      MdButtonModule,
      MdListModule,
      MdIconModule,
      MdCardModule,
      MdProgressSpinnerModule
      ],
})
export class MaterialModule { }