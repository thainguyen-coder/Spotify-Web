import { takeUntil } from 'rxjs/operators';
import { DestroyService } from './../../services/destroy-service.service';
import { Albums } from './../../model/albums';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Artist } from './../../model/artists';
import { Component, Input, OnInit } from '@angular/core';
import { SearchArtirstModel } from 'src/app/model/res/search.artirst-model';
import { Track } from 'src/app/model/tracks';
import { PlaySpotifyService } from 'src/app/services/play-spotify.service';

@Component({
  selector: 'app-artirst',
  templateUrl: './artirst.component.html',
  styleUrls: ['./artirst.component.scss'],
  providers: [DestroyService]
})
export class ArtirstComponent implements OnInit {
  @Input() artirst: SearchArtirstModel;
  id: string;
  artist: SearchArtirstModel;
  topTrack: Track;

  albums: Albums[];
  constructor(
    private _service: SpotifyService,
    private playTrackService: PlaySpotifyService,
    private _route: ActivatedRoute,
    private destroy: DestroyService
  ) {}

  ngOnInit() {
    this.getArtirst();
    this.getTopTrackArtist();
   
  }

  getArtirst() {
    this.id = this._route.snapshot.params.id
      ? this._route.snapshot.params.id
      : null;
    this._service
      .getArtirst(this.id).pipe(
        takeUntil(this.destroy.destroyed$),)
      .subscribe((artist: SearchArtirstModel) => {
        this.artist = artist;
      
        
      });
  }
  linkGenres(genres:string[]){
    if(genres.length ==0){
      return '';
    }
    const result =genres.join(',');
    return result;

  }
  getTopTrackArtist() {
    this.id = this._route.snapshot.params.id
      ? this._route.snapshot.params.id
      : null;
    this._service.artistTopTrack(this.id).subscribe((topTrack: Track) => {
      this.topTrack = topTrack;
    });
  }
  sendUriTrack(idTrack: string) {
    this.playTrackService.pushUri(idTrack);
  }
}
