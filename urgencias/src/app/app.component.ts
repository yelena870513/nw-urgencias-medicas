import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { MzSidenavComponent } from 'ngx-materialize';
import { filter } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {DataService} from './data/data.service';
import * as _ from 'lodash';
abstract class SectionRoutesPair {
  section: string;
  routes: Route[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MzSidenavComponent;

  groupedRoutes: Array<SectionRoutesPair>;
  scrollElement: JQuery;
  menu: any[];

  constructor(
    private router: Router,
    private mScrollbarService: MalihuScrollbarService,
    private translate: TranslateService,
    private dataService: DataService
  ) {
      // this language will be used as a fallback when a translation isn't found in the current language
      this.translate.setDefaultLang('es');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use('es');
  }

  ngOnInit() {
    this.populateSideNavWithRoutesGroupedBySections();
    this.setNavigationEndEvent();
    this.populateAlternativeMenu();


  }

  ngAfterViewInit() {
    this.initElement();
    this.initScrollbar();
  }

  ngOnDestroy() {
    this.mScrollbarService.destroy(this.scrollElement);
  }

  initElement() {
    this.scrollElement = $(`#${this.sidenav.id}`);
  }

  initScrollbar() {
    this.mScrollbarService.initScrollbar(this.scrollElement, { axis: 'y', theme: 'minimal', scrollInertia: 100 });
  }

  populateSideNavWithRoutesGroupedBySections() {
    // Take all routes with data and group them by sections
    this.groupedRoutes = this.router.config.reduce<Array<SectionRoutesPair>>(
      (returnValues, currentValue) => {
        if (currentValue.data) {
          const section = currentValue.data['section'];
          const existingSection = returnValues.find((r) => r && r.section === section);

          if (existingSection) {
            existingSection.routes.push(currentValue);
          } else {
            returnValues.push({ section: section, routes: [currentValue] });
          }
        }
        return returnValues;
      },
      new Array<SectionRoutesPair>());
  }

  populateAlternativeMenu(){
      this.dataService.getContent(this.translate.currentLang)
          .subscribe((data: any) => {
                  //noinspection TypeScriptUnresolvedFunction
                  let categories = data.docs.filter((f: any) =>  !_.isUndefined(f) && f.tipo === 'category')
                      .sort((a:any,b:any)=>a.order - b.order).map((m: any) => m.title);
                  this.menu = [
                      {name: 'NAV.START', url: '/home' },
                      {name: 'NAV.HOME', url: '/content', hasChild: true, children: categories },
                      {name: 'NAV.TABLE', url: '/table' },
                      {name: 'NAV.GLOSSARY', url: '/glossary' },
                      {name: 'NAV.CREDIT', url: '/credits' }
                  ];
              },
              (err)=>{alert(JSON.stringify(err))});
  }

  setNavigationEndEvent() {
    // scroll to top on each route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));
  }
}
