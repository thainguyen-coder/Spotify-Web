import { DestroyService } from './../../services/destroy-service.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/model/playlist';
import { PlaySpotifyService } from 'src/app/services/play-spotify.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-mylibrary',
  templateUrl: './mylibrary.component.html',
  styleUrls: ['./mylibrary.component.scss'],
  providers: [DestroyService]
})
export class MylibraryComponent implements OnInit {
  dataPlaylist: Playlist;
  constructor(private _service: SpotifyService,private playService:PlaySpotifyService,private destroy: DestroyService) {}

  ngOnInit() {
    this.getCurrentPlaylist();
   // this.UserProfile();
  }

  getCurrentPlaylist() {
    this._service.getCurrentPlaylist().pipe(
      takeUntil(this.destroy.destroyed$),
    ).subscribe((data: Playlist) => {
      this.dataPlaylist = data;
     

    });
  }
  
 
}
