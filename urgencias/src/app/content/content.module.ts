import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './content.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './content.routing';


@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(ROUTES),
  ],
  declarations: [ContentComponent]
})
export class ContentModule { }
