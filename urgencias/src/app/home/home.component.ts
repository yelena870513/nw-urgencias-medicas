import { Component } from '@angular/core';
import { ROUTE_ANIMATION, ROUTE_ANIMATION_HOST } from '../app.routing.animation';
import {IPropertyRow} from "../../../../demo/src/app/shared/properties-table/properties-table.component";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: ROUTE_ANIMATION_HOST, // tslint:disable-line:use-host-property-decorator
  animations: [ROUTE_ANIMATION],
})
export class HomeComponent {
  properties: IPropertyRow[] = [
    { name: 'height',
      mandatory: false,
      type: 'number',
      description: `Parallax container height in pixels`,
      defaultValue: `500`,
    },
  ];
  constructor(
      private translate: TranslateService,

  ) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
  }
}
