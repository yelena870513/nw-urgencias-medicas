import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from "../../data/data.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.scss']
})
export class QuestionaireComponent implements OnInit {

  questions: any[] = [];
  page =1;
  constructor( private dataService: DataService,
               private translate: TranslateService,

               ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('es');
    this.dataService.getQuestions(translate.currentLang)
        .subscribe((data: any) =>this.questions=data.docs );
  }

  ngOnInit() {
    this.dataService.getQuestions(this.translate.currentLang)
        .subscribe((data: any) => {
            this.questions = data.docs;
        });
  }

  onChange($item, $event){
   $item.returnValue = $event.returnValue;
  }


}
