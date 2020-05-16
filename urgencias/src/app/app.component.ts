import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
//noinspection TypeScriptCheckImport
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import {
    MzCollapsibleComponent,
    MzSidenavCollapsibleComponent,
    MzSidenavComponent,
    MzToastService,
} from 'ngx-materialize';
import { filter } from 'rxjs/operators';
import { DataService } from './data/data.service';

declare var $: any;
declare var win: any;
declare var window: any;
declare var OutApp: any;
declare var Swal: any;

abstract class SectionRoutesPair {
    section: string;
    routes: Route[];
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('sidenav') sidenav: MzSidenavComponent;
    @ViewChild('menuCollapse') menuCollapse: MzSidenavCollapsibleComponent;
    groupedRoutes: Array<SectionRoutesPair>;
    //noinspection TypeScriptUnresolvedVariable
    scrollElement: JQuery;
    menu: any[];
    credits: any[];
    quests: any[];
    theme: string;

    constructor(private router: Router,
        private mScrollbarService: MalihuScrollbarService,
        private translate: TranslateService,
        private toastService: MzToastService,
        private dataService: DataService,
        private route: ActivatedRoute) {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('es');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('es');

        this.route.params.subscribe((f: any) => {
            this.theme = f.theme;
        });
    }

    ngOnInit() {
        this.populateSideNavWithRoutesGroupedBySections();
        this.setNavigationEndEvent();
        this.populateAlternativeMenu();
    }

    ngAfterViewInit() {
        this.initElement();
        this.initScrollbar();
        this.clBackToTop();
    }

    ngOnDestroy() {
        //noinspection TypeScriptUnresolvedFunction
        this.mScrollbarService.destroy(this.scrollElement);
    }

    initElement() {
        this.scrollElement = $(`#${this.sidenav.id}`);
    }

    initScrollbar() {
        //noinspection TypeScriptUnresolvedFunction
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

    populateAlternativeMenu() {
        this.dataService.getContent(this.translate.currentLang)
            .subscribe((data: any) => {
                //noinspection TypeScriptUnresolvedFunction
                const categories = data.tema.sort((a: any, b: any) => a.orden - b.orden).map((m: any) => m.titulo);
                this.menu = [
                    // {name: 'NAV.START', url: '/home'},
                    { name: 'NAV.HOME', url: '/content', hasChild: true, children: categories },


                ];

                this.quests = [{ name: 'NAV.TABLE', url: '/ejercicios', hasChild: false }];

                this.credits = [{ name: 'NAV.CREDIT', url: '/credits', hasChild: true, children: ['team', 'author'] }];
            },
                (err) => {
                    alert(JSON.stringify(err));
                });
    }

    setNavigationEndEvent() {
        // scroll to top on each route change
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => window.scrollTo(0, 0));
    }

    clBackToTop() {

        const pxShow = 500;
        const goTopButton = $('.go-top');
        goTopButton.on('click', function (ev) {
            $('body,html').animate({
                scrollTop: 0,
            }, 600);
        });

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) {
            goTopButton.removeClass('hide');
        }

        $(window).on('scroll', function () {
            if ($(window).scrollTop() >= pxShow) {
                if (goTopButton.hasClass('hide')) {
                    goTopButton.removeClass('hide');
                }
            } else {
                goTopButton.addClass('hide');
            }
        });
    }

    Salir() {
        const self = this;
        Swal.fire({
            title: self.translate.instant('MODAL.SALIR'),
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3cba54',
            cancelButtonColor: '#d33',
            confirmButtonText: self.translate.instant('MODAL.ACCEPT'),
        }).then((result) => {
            if (result.value) {
                self.LogOut();
            }
        });
    }

    LogOut() {

        // Preguntar primero desde que dispositivo se navega
        if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
            try {
                win.close(true);
            } catch (reason) {
                window.close();

            }

        } else {
            window.close();


        }

    }
}
