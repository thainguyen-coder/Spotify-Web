import { SearchResModel } from './../../model/res/search.res-model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Artist } from './../../model/artists';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs/operators';
import { Subject, timer, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SearchArtirstModel } from 'src/app/model/res/search.artirst-model';
import { SearchAlbumModel } from 'src/app/model/res/search.album-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchStr: string;
  results$: Observable<SearchResModel>;
  query: FormControl = new FormControl();
  searchSubject = new Subject<string>();

  listArtisrs: SearchArtirstModel[];
  listTrack: SearchAlbumModel[];
  moreArtirst: boolean = false;
  moreTrack: boolean = false;

  constructor(private _service: SpotifyService, private _route: Router) {}

  ngOnInit(): void {
    this.results$ = this.searchSubject.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => {
        return this._service.seachTrackOrMusic(query, 'track%2Cartist').pipe(
          map((res: SearchResModel) => {
            this.listArtisrs = res.artists.items;

            this.listTrack = res.tracks.items;
            return res;
          })
        );
      })
    );
  }

  search(query: string) {
    if (query) {
      this.searchSubject.next(query);
    }
  }
  seeMoreArtirst() {
    this.moreArtirst = !this.moreArtirst;
  }

  seeMoreTracks() {
    this.moreTrack = !this.moreTrack;
  }
}
