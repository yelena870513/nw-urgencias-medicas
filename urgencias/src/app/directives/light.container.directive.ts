import {Directive, ElementRef, EventEmitter, HostListener, Input} from '@angular/core';
import * as _ from 'lodash';
import {LightboxService} from "../service/lightbox.service";

@Directive({
    selector: '[light-container]',
})

export class LightContainerDirective {
    constructor(private lightboxService: LightboxService){

    }
    @HostListener('click', ['$event.target']) onClick(ev) {
        this.initLightBox(ev);
    }

    private initLightBox(ev) {
        this.lightboxService.initLightBox(ev);
    }
}
