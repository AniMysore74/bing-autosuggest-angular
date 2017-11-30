import { Params } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Component, Injectable} from '@angular/core';
import { Headers, Jsonp, Response, URLSearchParams } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class BingService {

    constructor(private http: HttpClient) {}

    bingAutosuggest(query: string) {

        // Do not make http request if query term is empty
        if (query === '') {
            return Observable.of([]);
        }

        const url = 'https://api.cognitive.microsoft.com/bing/v7.0/Suggestions';
        const key = '7cda2873ff154bf1bc871bfc64bde7ff';

        // Construct the request
        const headers = {'Ocp-Apim-Subscription-Key': key};
        const params = {'q': query};
        const responseType = 'json';

        return this.http.get(url, {headers, params, responseType}).map(data => {
            const res = <string[]>[];
            for (const term of data['suggestionGroups'][0]['searchSuggestions']){
                res.push(term['query']);
            }
            return res
        });
    }
}
