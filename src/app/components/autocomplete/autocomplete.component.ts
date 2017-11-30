import { Component } from "@angular/core";
import {Jsonp, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BingService } from '../../services/bing-service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { BingAutosuggestAngularPage } from '../../../../e2e/app.po';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  providers: [BingService],
  styles: [`.form-control { width: 300px; display: inline; }`]
})
export class AutocompleteComponent {
  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private bingService: BingService) {}

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(100)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .debounceTime(300)
      .switchMap(term =>
        this.bingService.bingAutosuggest(term)
          .do(() => {
            this.searchFailed = false;
          })
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);
}
