import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {
    }

    public getContent(lang: string): Observable<any> {
        return this.http.get('assets/data/multimedia.' + lang + '.json');  }

    public getCredits(lang: string): Observable<any> {
        return this.http.get('assets/data/creditos.' + lang + '.json');
    }
}
