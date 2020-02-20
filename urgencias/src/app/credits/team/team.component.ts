import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "../../data/data.service";
import {MzCollapsibleComponent} from "ngx-materialize";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, AfterViewInit {
  team: any[];
  @ViewChild('teamCollapsible') teamCollapsible: MzCollapsibleComponent;
  constructor(private dataService: DataService, private translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
  }

  ngOnInit() {
      this.dataService.getContent(this.translate.currentLang).subscribe(
          ((data: any) =>{
              this.team = data.creditos.filter((d: any) => d.tipo === 'equipo');
              setTimeout(() => {
                  for (let i = 0; i < this.team.length; i++) {
                      this.teamCollapsible.open(i);
                  }
              })
          })
      );
  }

    ngAfterViewInit(): void {

    }

}
