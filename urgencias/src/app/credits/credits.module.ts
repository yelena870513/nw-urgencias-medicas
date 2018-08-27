import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditsComponent } from './credits.component';
import { AuthorComponent } from './author/author.component';
import {TeamComponent} from "./team/team.component";
import {ROUTES} from "./credits.routing";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {MzCollapsibleModule} from "ngx-materialize";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    MzCollapsibleModule
  ],
  declarations: [CreditsComponent, TeamComponent, AuthorComponent]
})
export class CreditsModule { }
