import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from "../data/data.service";
import {TranslateService} from "@ngx-translate/core";
import {MzToastService} from "ngx-materialize";
import _ from 'lodash';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, AfterViewInit {

    theme: string;
    contents: any [];
    totals: any [];
    current: any;
    readMode = true;
    searchMode = false;
    hasError = false;
    searchString = '';
    @ViewChild("sidenav") sidenav: any;
    @ViewChild("searchInput") searchInput: any;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private translate: TranslateService,
        private toastService: MzToastService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
    ) {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('es');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('es');
        this.route.params.subscribe((f: any) => {
            this.theme = f.theme;
            if (this.theme === 'Introducción') {
                this.router.navigate(['home']);
            }
            this.searchString = '';
            if (!_.isNil(this.searchInput)) {
                this.searchInput.nativeElement.value = '';
            }
            this.dataService.getContent(this.translate.currentLang)
                .subscribe((data: any) => {
                    this.contents = data.contenido
                        .filter((f: any) => f.tema.titulo === this.theme)
                        .sort((a: any, b: any) => a.orden - b.orden);
                    this.totals = data.contenido;
                    this.current = this.contents[0];
                });
        });
    }

    ngOnInit() {
    }

    openRead(content, readMode, searchString) {
        this.current = content;
        this.readMode = readMode;
        this.searchMode = !readMode;
        this.searchString = searchString;
        setTimeout(() => {
            //this.transpileImages();
        }, 3000);
        this.sidenav.opened = false;
    }

    FireAction($event) {
        this.searchString = $event.target.value;
    }

    startSearch(event, openSide) {
        if (event.keyCode === 13) {
            if (event.target.value.length > 2) {
                this.searchString = event.target.value;
                this.searchMode = true;
                this.readMode = false;
                this.hasError = false;
                if (openSide === undefined || openSide === true) {
                    this.sidenav.opened = !this.sidenav.opened;
                }
            } else {
                this.toastService.show('<i> Introduzca al menos tres caracteres. </i> ', 4000, 'green');
                this.hasError = true;
            }
        }
    }

    offSearch() {
        this.readMode = true;
        this.searchMode = false;
        this.searchString = '';
    }

    ngAfterViewInit() {
        this.searchInput.nativeElement.value = '';

    }

    private transpileImages() {
        const images = document.querySelectorAll('.article img');
        // @ts-ignore
        for (const image of images) {
            image.attributes.src.nodeValue = './assets/images/app/' + image.attributes.src.nodeValue;
            image.style.width = "100%";
            image.style.display = "block";
            image.classList.add('content-image');
        }
        const tables = document.querySelectorAll('table');
        // @ts-ignore
        for (const t of tables) {
            t.style.width = "100%";
        }
        this.changeDetectorRef.markForCheck();
    }


}
