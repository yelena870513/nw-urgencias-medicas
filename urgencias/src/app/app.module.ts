import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import { MzButtonModule, MzIconMdiModule, MzSidenavModule } from 'ngx-materialize';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routing';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DataModule} from './data/data.module';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    // external modules
    BrowserAnimationsModule,
    CommonModule,
    MalihuScrollbarModule.forRoot(),
    MzButtonModule,
    MzIconMdiModule,
    MzSidenavModule,
    DataModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
