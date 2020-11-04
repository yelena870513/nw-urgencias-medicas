import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({ name: 'sortSearch' })
export class SortSearch implements PipeTransform {
    transform(searchResults: any[], currentTheme: string) {
        let sortedResults = searchResults;
        if (!_.isNil(currentTheme)) {
            sortedResults = searchResults
                .filter((f: any) => f.tema.titulo === currentTheme)
                .sort((a: any, b: any) => a.orden - b.orden);

            sortedResults = [
                ...sortedResults,
                ...searchResults
                    .filter((f: any) => f.tema.titulo !== currentTheme)
                    .sort((a: any, b: any) => a.orden - b.orden),
            ];
        }

        return sortedResults;
    }
}
