import { Albums } from './../../model/albums';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { mapTo, tap } from 'rxjs/operators';
import { SearchAlbumModel } from 'src/app/model/res/search.album-model';
import { Searchsong } from './searchsong.model';
import { SearchsongStore } from './searchsong.store';
import { SetEntities } from '@datorama/akita/lib/setEntities';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/model/items';

@Injectable({ providedIn: 'root' })
export class SearchsongService {
  constructor(
    private searchSongStore: SearchsongStore,
    private http: HttpClient
  ) {}

  get(query: string, type: string) {
    return this.http
      .get<any>(
        `https://api.spotify.com/v1/search?q=${query}&offset=0&limit=20&type=${type}&market=US`
      )
      .pipe(
        map((res) => res.tracks),
        tap((entities) => {
          const searchSong = {
            result: entities,
            keyWord: query,
          };
         
          
          this.searchSongStore.update(searchSong);
        })
      );
  }
  updateStatus() {
    const searchSongValue1 = this.searchSongStore.getValue();
    const temp = {
      ...searchSongValue1,
      checkResultCreate: true,
    };
    this.searchSongStore.update(temp);
  }

  update(id, searchsong: Partial<Searchsong>) {
    this.searchSongStore.update(id, searchsong);
  }
  removeState() {
    const searchSong = {
      result: null,
      keyWord: null,
    };

    this.searchSongStore.update(searchSong);
  }

  removeTrackFromResult(id: string) {
    const searchSongValue = this.searchSongStore.getValue();
    const temp = {
      ...searchSongValue.result,
      items: searchSongValue.result.items.filter((e) => e.id !== id),
    };
    this.searchSongStore.update({
      ...searchSongValue,
      result: temp,
    });
  }
  
}
