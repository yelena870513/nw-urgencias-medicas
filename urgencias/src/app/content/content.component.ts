import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../data/data.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  theme: string;
  contents: any [];
  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
      private translate: TranslateService,
  ) {
    this.route.params.subscribe((f:any)=>{
    this.theme = f.theme;
    this.dataService.getContent(this.translate.currentLang)
        .subscribe((data: any) => {
              this.contents = data.docs.filter((f:any) => f.category===this.theme);
        })
  })}

  ngOnInit() {
  }

}
