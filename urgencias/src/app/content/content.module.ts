import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './content.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './content.routing';
import {MzToastModule, MzCardModule, MzPaginationModule} from "ngx-materialize";
import {MzSidenavModule} from "ngx-materialize";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {SearchForPipe} from "../pipes/search-for";
import {LiteSearchPipe} from "../pipes/lite-search";
import {HighlightsPipe} from "../pipes/highlights";
//noinspection TypeScriptCheckImport
import {NgxPaginationModule} from 'ngx-pagination';
import {GoResultDirective} from "../directives/go-result.directive";
import {LogoPipe} from "../pipes/logo";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    MzSidenavModule,
    MzToastModule,
    MzCardModule,
    NgxPaginationModule,
    MzPaginationModule,
      TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
      })
  ],
  declarations: [
      ContentComponent,
      SearchForPipe,
      LiteSearchPipe,
      HighlightsPipe,
      GoResultDirective,
      LogoPipe
  ]
})
export class ContentModule { }
