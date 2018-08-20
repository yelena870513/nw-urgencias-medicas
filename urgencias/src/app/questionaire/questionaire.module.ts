import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionaireComponent } from './questionaire/questionaire.component';
import {SharedModule} from "../shared/shared.module";
import {ROUTES} from "./questionaire.routing";
import {RouterModule} from '@angular/router';
import {MzCardModule, MzPaginationModule} from 'ngx-materialize'
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MzCardModule,
    NgxPaginationModule,
    MzPaginationModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [QuestionaireComponent]
})
export class QuestionaireModule { }
