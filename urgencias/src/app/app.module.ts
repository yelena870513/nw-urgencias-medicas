import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
//noinspection TypeScriptCheckImport
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import {
    MzButtonModule,
    MzCollapsibleModule,
    MzCollectionModule,
    MzIconMdiModule,
    MzModalModule,
    MzSidenavModule, MzToastModule,
} from 'ngx-materialize';

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LightboxModule } from 'ngx-lightbox';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routing';
import { DataModule } from './data/data.module';

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
        MzToastModule,
        MzModalModule,
        MzCollectionModule,
        DataModule,
        MzCollapsibleModule,
        MarkdownModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        LightboxModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {
}
