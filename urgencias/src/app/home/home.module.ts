import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MzButtonModule, MzIconMdiModule, MzParallaxModule } from 'ngx-materialize';
import { HomeComponent } from './home.component';
import { ROUTES } from './home.routing';
import { MzCardModule } from 'ngx-materialize'
import {CodeSnippetModule} from "../../../../demo/src/app/shared/code-snippet/code-snippet.module";
import {PropertiesTableModule} from "../../../../demo/src/app/shared/properties-table/properties-table.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MarkdownModule.forRoot(),
    MzButtonModule,
    MzIconMdiModule,
    MzParallaxModule,
    RouterModule.forChild(ROUTES),
    MzCardModule,
    CodeSnippetModule,
    PropertiesTableModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
