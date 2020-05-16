import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LightboxModule } from 'ngx-lightbox';
import { MzCardModule, MzPaginationModule, MzToastModule } from 'ngx-materialize';
import { MzSidenavModule } from 'ngx-materialize';
//noinspection TypeScriptCheckImport
import { NgxPaginationModule } from 'ngx-pagination';
import { GoResultDirective } from '../directives/go-result.directive';
import { LightContainerDirective } from '../directives/light.container.directive';
import { HighlightsPipe } from '../pipes/highlights';
import { LiteSearchPipe } from '../pipes/lite-search';
import { LogoPipe } from '../pipes/logo';
import { SearchForPipe } from '../pipes/search-for';
import { LightboxService } from '../service/lightbox.service';
import { ContentComponent } from './content.component';
import { ROUTES } from './content.routing';


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
              deps: [HttpClient],
          },
      }),
    LightboxModule
  ],
  declarations: [
      ContentComponent,
      SearchForPipe,
      LiteSearchPipe,
      HighlightsPipe,
      GoResultDirective,
      LightContainerDirective,
      LogoPipe,
  ],
  providers: [LightboxService]
})
export class ContentModule { }
