import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class LightboxService {
    lightBoxInitiator = new EventEmitter();

    initLightBox(ev) {
        this.lightBoxInitiator.emit(ev);
    }
}
