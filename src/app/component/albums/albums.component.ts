import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Albums } from './../../model/albums';
import { Component, OnInit } from '@angular/core';
import { PlaySpotifyService } from 'src/app/services/play-spotify.service';
import { Track } from 'src/app/model/tracks';
import { error } from 'node:console';
import { DestroyService } from 'src/app/services/destroy-service.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  providers: [DestroyService], // provide at component level
})
export class AlbumsComponent implements OnInit {
  id: string;
  isLoadingPlaylist: boolean = true;
  albums: Albums[];
  constructor(
    private _service: SpotifyService,
    private playTrackService: PlaySpotifyService,
    private _route: ActivatedRoute,
    private destroy: DestroyService
  ) {}

  ngOnInit() {
    this.getAlbum();
  }

  getAlbum() {
    this.id = this._route.snapshot.params.id
      ? this._route.snapshot.params.id
      : null;
    
    this._service.getAlbum(this.id).pipe(
      takeUntil(this.destroy.destroyed$),
    ).subscribe((album: any) => {
      this.albums = album;
    
    },error =>this.isLoadingPlaylist =false);
  }
  sendUriTrack(idTrack: string) {
    this.playTrackService.pushUri(idTrack);
  }
}
