import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  constructor(private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
  }

  ngOnInit() {
  }

}
