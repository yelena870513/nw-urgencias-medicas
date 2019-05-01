import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from "../data/data.service";
import {TranslateService} from "@ngx-translate/core";
import {MzToastService} from "ngx-materialize";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  theme: string;
  contents: any [];
  totals: any [];
  current: any;
  readMode  = true;
  searchMode  = false;
  hasError  = false;
  searchString='';
  @ViewChild("sidenav") sidenav:any;
  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
      private translate: TranslateService,
      private toastService: MzToastService,
  ) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
    this.route.params.subscribe((f:any)=>{
    this.theme = f.theme;
    this.dataService.getContent(this.translate.currentLang)
        .subscribe((data: any) => {
              this.contents = data.docs.filter((f:any) => f.category ===this.theme && f.tipo=='content').sort((a: any, b: any)=>a.order - b.order);
              this.totals = data.docs.filter((f:any) => f.tipo ==='content');
              this.current = this.contents[0];
        })
  })}

  ngOnInit() {
  }

    openRead(content, readMode, searchString){
    this.current = content;
    this.readMode = readMode;
    this.searchMode = !readMode;
    this.searchString = searchString;
  }
    FireAction($event) {
        this.searchString = $event.target.value;
    }

    startSearch(event,openSide)
    {
        if (event.keyCode === 13) {
            if (event.target.value.length>2) {
                this.searchString = event.target.value;
                this.searchMode = true;
                this.readMode = false;
                this.hasError=false;
                if (openSide === undefined || openSide === true) {
                    this.sidenav.opened = !this.sidenav.opened;
                }
            }
            else{
                this.toastService.show('<i>Al menos tres caracteres</i>!', 4000, 'green');
                this.hasError=true;
            }
        }
    }
    offSearch(){
        this.readMode = true;
        this.searchMode = false;
        this.searchString = '';
    }

}
