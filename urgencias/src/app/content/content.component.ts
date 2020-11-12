import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import _ from 'lodash';
import { Lightbox } from 'ngx-lightbox';
import { MzToastService } from 'ngx-materialize';
import { DataService } from '../data/data.service';
import { LightboxService } from '../service/lightbox.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, AfterViewInit {
    private _album = [];
    theme: string;
    contents: any [];
    totals: any [];
    current: any;
    readMode = true;
    searchMode = false;
    hasError = false;
    images: NodeListOf<HTMLImageElement>;
    lightboxLoaded = false;
    searchString = '';
    @ViewChild('sidenav') sidenav: any;
    @ViewChild('contentReference') contentReference: any;
    @ViewChild('searchInput') searchInput: any;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
        private translate: TranslateService,
        private toastService: MzToastService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private _lightbox: Lightbox,
        private _lightBoxService: LightboxService,
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
                        // tslint:disable-next-line:no-shadowed-variable
                        .filter((f: any) => f.tema.titulo === this.theme)
                        .sort((a: any, b: any) => a.orden - b.orden);
                    this.totals = data.contenido;
                    this.current = this.contents[0];

                    if (this.contents.length < 2) {
                        if (this.sidenav && this.sidenav.opened ) {
                            this.sidenav.opened = false;
                        }
                    }

                    this.offSearch();
                });
            this.resetLightBox();
        });

        setTimeout(() => {
            this.initLightBox(undefined);
        }, 5000);

        this._lightBoxService.lightBoxInitiator.subscribe((ev) => {
            if (!this.lightboxLoaded) {
                this.initLightBox(ev);
            }
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
            // this.transpileImages();
            this.resetLightBox();
            if (!_.isNil(searchString)) {
                this.contentReference.nativeElement.click();
            }
        }, 1000);
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
                const errorMessage = '<i> Introduzca al menos tres caracteres.'
                    + ' </i> ';
                this.toastService.show(errorMessage, 4000, 'green');
                this.hasError = true;
            }
        }
    }

    onClickedAugment($event) {
        $event.stopPropagation();
        this.startSearch({
            keyCode: 13,
            target: {
                value: this.searchInput.nativeElement.value,
            },
        }, false);
    }

    offSearch() {
        this.readMode = true;
        this.searchMode = false;
        this.searchString = '';
        this.searchInput.nativeElement.value = '';
    }

    ngAfterViewInit() {
        this.searchInput.nativeElement.value = '';
    }

    private transpileImages() {
        const images = document.querySelectorAll('.article img');
        // @ts-ignore
        for (const image of images) {
            image.attributes.src.nodeValue = './assets/images/app/'
                + image.attributes.src.nodeValue;
            image.style.width = '100%';
            image.style.display = 'block';
            image.classList.add('content-image');
        }
        const tables = document.querySelectorAll('table');
        // @ts-ignore
        for (const t of tables) {
            t.style.width = '100%';
        }

        this.changeDetectorRef.markForCheck();
    }

    private initLightBox(ev) {
        const self = this;
        this.images = document.querySelectorAll('.section.article img');
        let promises = [];
        for (let i = 0; i < self.images.length; i++) {
            const item = self.images[i];
            promises = [...promises, self.toDataUrl({
                src: item.src,
                caption: item.alt,
                thumb: item.src,
            })];
            Promise.all(promises)
                .then((album) => {
                    this._album = album;
                })
                .catch(reason => {
                    this._album = [];
                });

            item.addEventListener('click', () => {
                self._lightbox.open(self._album, i);
            });
        }
        if (!_.isNil(ev)) {
            if (ev.tagName === 'IMG') {
                const positionSelected = _.findIndex(self._album, (el) => {
                    return el.src === ev.src;
                });

                if (positionSelected !== -1) {
                    self._lightbox.open(self._album, positionSelected);
                }
            }
        }

        self.lightboxLoaded = true;
    }

    private toDataUrl(item) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                const reader = new FileReader();
                reader.onloadend = function () {
                    item.src = reader.result;
                    resolve(item);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', item.src);
            xhr.responseType = 'blob';
            xhr.send();
        });
    }

    private resetLightBox() {
        this._album = [];
        this.lightboxLoaded = false;
    }

}
