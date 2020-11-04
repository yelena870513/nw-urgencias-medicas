import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'searchFor' })
export class SearchForPipe implements PipeTransform {
  transform(content: any [], searchString: string) {
    if (!searchString) {
      return [];
    }
    const result = [];
    searchString = searchString.toLowerCase();

    searchString = searchString.replace(/a/gi, '[a|á]');
    searchString = searchString.replace(/e/gi, '[e|é]');
    searchString = searchString.replace(/i/gi, '[i|í]');
    searchString = searchString.replace(/o/gi, '[o|ó]');
    searchString = searchString.replace(/u/gi, '[u|ú]');

    content.forEach(function(item) {

        //noinspection TypeScriptUnresolvedFunction
        if (!_.isNil(item.texto)) {
            const temp = item.texto.toLowerCase()
                .replace(/<\/?[^>]+(>|$)/g, '');


            if ( temp.search(searchString) !== -1) {
                result.push(item);
            }
        }


    });

    return result;
  }
}
