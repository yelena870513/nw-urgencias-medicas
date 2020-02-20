import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    public getContent(lang: string): Observable<any> {
        return this.http.get('assets/data/multimedia.content.' + lang + '.json');  }

    public getCredits(lang: string): Observable<any> {
        return this.http.get('assets/data/creditos.' + lang + '.json');
    }

    public getQuestions(lang: string): Observable<any>{
        return this.http.get('assets/data/preguntas.' + lang + '.json');

    }
}
