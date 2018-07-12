import { Injectable } from '@angular/core';
declare var JQuery: any;
declare var $: any;
declare var Materialize: any;
@Injectable()
export class MzToastService {

  show(message: string, displayLength: number, className?: string, completeCallback?: Function) {
    Materialize.toast(message, displayLength, className, completeCallback);
  }
}
