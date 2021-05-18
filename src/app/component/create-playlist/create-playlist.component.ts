import { Albums } from 'src/app/model/albums';
import { Router } from '@angular/router';

import { SearchsongQuery } from './../../state/state/searchsong.query';
import { Searchsong } from './../../state/state/searchsong.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, Input, OnInit } from '@angular/core';
import { CreatePlaylistModel } from 'src/app/model/create-playlist-model';
import { Subject } from 'rxjs';
import { SearchResModel } from 'src/app/model/res/search.res-model';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { SearchArtirstModel } from 'src/app/model/res/search.artirst-model';
import { SearchAlbumModel } from 'src/app/model/res/search.album-model';
import { Observable } from 'rxjs';
import { SearchsongService } from 'src/app/state/state/searchsong.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss'],
})
export class CreatePlaylistComponent implements OnInit {
  searchSubject = new Subject<string>();
  createSubject = new Subject<string>();
  results$: Observable<Albums>;
  listArtisrs: SearchArtirstModel[];
  listTrack: SearchAlbumModel[];
  //id: string;
  listTrackPlaylist: any[];
  arr: string[] = [];
  dataUser: any;
  //model: CreatelaylistModel;

  constructor(
    private _service: SpotifyService,
    private serSearchSong: SearchsongService,
    private searchSongQuery: SearchsongQuery,
    private route: Router
  ) {}

  ngOnInit() {
 
    this.results$ = this.searchSongQuery.result$;
    
  }

  
  add(data: any) {
    const model1: CreatePlaylistModel = {
      name: 'Playlist',
      description: 'Description',
      public: false,
    };

    const user = localStorage.getItem('user');
    const userId = JSON.parse(user);

    this._service
      .createPlaylist(userId.id, model1)
      .pipe(
        mergeMap((playlist: any): any => {
          if (playlist) {
            return this._service.addItemPlaylist(playlist.id, data.uri).pipe(
              tap((item) => {
                this.serSearchSong.removeTrackFromResult(data.id);
                this.serSearchSong.updateStatus();
                this.route.navigate(['/playlist/', playlist.id]);
              })
            );
          }
        })
      )
      .subscribe();
  }
}
