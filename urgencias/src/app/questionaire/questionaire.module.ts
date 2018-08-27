import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import {SharedModule} from "../shared/shared.module";
import {ROUTES} from "./questionaire.routing";
import {RouterModule} from '@angular/router';
import {MzCardModule, MzInputModule, MzPaginationModule, MzRadioButtonModule, MzIconModule, MzIconMdiModule} from 'ngx-materialize'
import {NgxPaginationModule} from "ngx-pagination";
import {MapTextPipe} from "../pipes/map-text";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MzCardModule,
    NgxPaginationModule,
    MzPaginationModule,
    RouterModule.forChild(ROUTES),
    MzIconModule,
    MzIconMdiModule,
    MzInputModule,
    MzRadioButtonModule
  ],
  declarations: [QuestionaireComponent, MapTextPipe]
})
export class QuestionaireModule { }
