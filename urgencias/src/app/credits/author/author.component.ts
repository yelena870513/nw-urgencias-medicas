import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data/data.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authors: any [];
  constructor(private dataService: DataService, private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
  }

  ngOnInit() {
    this.dataService.getCredits(this.translate.currentLang).subscribe(
        ((data: any) =>{
          this.authors = data.docs.filter((d: any) => d.tipo === 'autor');
        })
    );
  }

}
