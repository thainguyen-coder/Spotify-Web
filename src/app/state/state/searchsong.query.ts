import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SearchsongStore, SearchsongState } from './searchsong.store';

@Injectable({ providedIn: 'root' })
export class SearchsongQuery extends QueryEntity<SearchsongState> {
  result$ = this.select((state) => state.result);
  keyWord$ = this.select((state) => state.keyWord);
  checkResultCreate$ = this.select((state) => state.checkResultCreate);

  constructor(protected store: SearchsongStore) {
    super(store);
  }
}
