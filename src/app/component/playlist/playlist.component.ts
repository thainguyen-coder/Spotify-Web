import { DestroyService } from './../../services/destroy-service.service';
import { CreatePlaylistComponent } from './../create-playlist/create-playlist.component';
import { debounceTime, filter, pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { SearchsongService } from 'src/app/state/state/searchsong.service';
import { Observable } from 'rxjs';
import { Albums } from 'src/app/model/albums';
import { SearchsongQuery } from './../../state/state/searchsong.query';
import { Track } from './../../model/tracks';
import { Item } from './../../model/items';
import { Playlist } from './../../model/playlist';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import { PlaySpotifyService } from 'src/app/services/play-spotify.service';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [DestroyService]
})
export class PlaylistComponent implements OnInit, OnDestroy {
  searchSubject = new Subject<string>();
  results$: Observable<Albums>;
  id: string;
  playlist: Playlist;
  playTrack: Track;
  playlistTrack: Track;
  itemPlayList: Item;
  resultSearchSong: Observable<Albums>;
  checkCreatePlaylist: boolean = true;
  isLoadingPlaylist: boolean = true;
  constructor(
    private _service: SpotifyService,
    private _route: ActivatedRoute,
    private playTrackService: PlaySpotifyService,
    private serQuery: SearchsongQuery,
    private searchSongService: SearchsongService,
    private router: Router,
    private destroy: DestroyService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((even: any) => even instanceof RoutesRecognized),
        pairwise(), takeUntil(this.destroy.destroyed$)
      )
      .subscribe((event: RoutesRecognized[]): any => {
        //????
        if (event[0].urlAfterRedirects != '/create') {
          this.searchSongService.removeState();
        }
      });
    this.getPlaylist();

    this.dataSearchSong();
    this.resultSearch();
    this.results$ = this.serQuery.result$;
  }
  getPlaylist() {
    this._route.params
      .pipe(
        switchMap((p: any) => {
          let usr = p['id'];
          this.isLoadingPlaylist = true;

          return this._service.getPlayList(usr);
        }), takeUntil(this.destroy.destroyed$)
      )
      .subscribe(
        (data: any) => {
          this.playlist = data;
          this.isLoadingPlaylist = false;
        },
        (error) => (this.isLoadingPlaylist = false)
      );
  }

  sendUriTrack(idTrack: string) {
    this.playTrackService.pushUri(idTrack);
  }
  addTrackToPlaylist(data: any) {
    const id = this._route.snapshot.params.id
      ? this._route.snapshot.params.id
      : 'null';
    this._service.addItemPlaylist(id, data.uri).subscribe((item) => {
      this.searchSongService.removeTrackFromResult(data.id);
      this.getPlaylist();
    });
  }
  addTrackPlaylist(uri: string, idTrack: string) {
    const id = this._route.snapshot.params.id
      ? this._route.snapshot.params.id
      : 'null';
    this._service.addItemPlaylist(id, uri).subscribe((item) => {
      this.searchSongService.removeTrackFromResult(idTrack);
      this.getPlaylist();
    });
  }

  dataSearchSong() {
    this.resultSearchSong = this.serQuery.result$;
  }
  ///////////////
  search(query: string) {
    if (query) {
      this.searchSubject.next(query);
    } else {
      console.log('error nhen!');
    }
  }
  //result search
  resultSearch() {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query) {
            return this.searchSongService.get(query, 'track');
          } else {
            console.log('not');
          }
        }), takeUntil(this.destroy.destroyed$)
      )
      .subscribe(() => {});
  }
  // add item playlist

  ngOnDestroy(): void {
    this.searchSongService.removeState();
  }
}
