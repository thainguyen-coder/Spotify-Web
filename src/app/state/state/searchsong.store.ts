import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Albums } from 'src/app/model/albums';
import { Searchsong } from './searchsong.model';

export interface SearchsongState extends EntityState<Searchsong,string> {
  result: Albums;
  keyWord: string;
  checkResultCreate:boolean;
}
export function createInitialState(): SearchsongState {
  return {
    result: null,
    keyWord: '',
    checkResultCreate: false
  };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'searchsong' })
export class SearchsongStore extends EntityStore<SearchsongState> {
  constructor() {
    super(createInitialState());
  }
}
