import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
//noinspection TypeScriptCheckImport
import {NgxPaginationModule} from 'ngx-pagination';

import { ContentComponent } from './content.component';
import {SearchForPipe} from "../pipes/search-for";
import {LiteSearchPipe} from "../pipes/lite-search";
import {HighlightsPipe} from "../pipes/highlights";
import {GoResultDirective} from "../directives/go-result.directive";
import {ROUTES} from "./content.routing";
import {MzSidenavModule, MzToastModule, MzCardModule, MzPaginationModule} from 'ngx-materialize';
import {HttpClient} from "@angular/common/http";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
//noinspection TypeScriptUnresolvedFunction
describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  //noinspection TypeScriptUnresolvedFunction
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
          GoResultDirective
      ]
    })
    .compileComponents();
  }));

  //noinspection TypeScriptUnresolvedFunction
  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //noinspection TypeScriptUnresolvedFunction
  it('should create', () => {
    //noinspection TypeScriptUnresolvedFunction
    expect(component).toBeTruthy();
  });
});
