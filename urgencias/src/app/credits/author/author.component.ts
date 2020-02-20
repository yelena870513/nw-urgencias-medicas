import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {DataService} from "../../data/data.service";
import {TranslateService} from "@ngx-translate/core";
import {MzCollapsibleComponent, MzSidenavComponent} from "ngx-materialize";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, AfterViewInit {
  @ViewChild('autorCollapsible') autorCollapsible: MzCollapsibleComponent;
  authors: any [];
  constructor(private dataService: DataService, private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
  }

  ngOnInit() {
    this.dataService.getContent(this.translate.currentLang).subscribe(
        ((data: any) =>{
          this.authors = data.creditos.filter((d: any) => d.tipo === 'autor');
        })
    );
  }

    ngAfterViewInit() {
      this.autorCollapsible.items.map((item, index) => {
          this.autorCollapsible.open(index);
      })
  }

}
