import { AuthServiceService } from './../../services/auth/authService.service';
import { DestroyService } from './../../services/destroy-service.service';
import { Track } from './../../model/tracks';
import { Playlist } from './../../model/playlist';
import { TokenService } from './../../services/auth/token.service';
import { Albums } from './../../model/albums';
import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

import { ActivatedRoute } from '@angular/router';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { Item } from 'src/app/model/recent_model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService],
})
export class HomeComponent implements OnInit {
  newReleases: Albums;
  albums: {} = {};
  after: string;
  before: string;
  data: Track[];
  dataRecent: Track[];
  dataPlaylist: Playlist;

  dataRecentNew: Track[];
  dataListNewReleases: Albums;
  @Input() album: any;

  private stream: Subscription | null = null;
  //data1: Albums;
  constructor(
    private _service: SpotifyService,
    private _route: ActivatedRoute,
    private tokenService: TokenService,
    private destroy: DestroyService,
    private authService: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.authService.authorizedStream.subscribe((res) => {
      if (res) {
        this.getRecentlyPlayer();
        this.newListRelease();
        this.UserProfile();
      }
     
    });
  }
  getRecentlyPlayer() {
    this.after = this._route.snapshot.params.after
      ? this._route.snapshot.params.after
      : null;
    this.before = this._route.snapshot.params.before
      ? this._route.snapshot.params.before
      : null;

    this._service
      .getRecentlyPlayedTracks(this.after, this.before)
      .pipe(takeUntil(this.destroy.destroyed$))
      .subscribe((data: any) => {
        let arr: [] = data.items;
        let arrNew = arr.filter(function (item: any, index) {
          return (
            arr.filter((val, i) => {
              return (
                (val as any).track.id === item.track.id &&
                index !== i &&
                i > index
              );
            }).length === 0
          );
        });
        this.dataRecent = arrNew;
      });
  }

  newListRelease() {
    this._service
      .getNewReleases()
      .pipe(takeUntil(this.destroy.destroyed$))
      .subscribe((data: any) => {
        this.dataListNewReleases = data;
      });
  }

  UserProfile() {
    this._service
      .getCurrentUserProfile()
      .pipe(takeUntil(this.destroy.destroyed$))
      .subscribe((data: any) => {
        localStorage.setItem('user', JSON.stringify(data));
      });
  }
}
