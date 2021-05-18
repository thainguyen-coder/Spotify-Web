import { Component, Input, OnInit } from '@angular/core';
import { SearchAlbumModel } from 'src/app/model/res/search.album-model';
import { PlaySpotifyService } from 'src/app/services/play-spotify.service';

@Component({
  selector: 'app-search-items-track',
  templateUrl: './search-items-track.component.html',
  styleUrls: ['./search-items-track.component.scss']
})
export class SearchItemsTrackComponent implements OnInit {
  
 
  @Input() tracks:SearchAlbumModel;
  constructor(
    private playTrackService: PlaySpotifyService,
  ) { }

  ngOnInit() {

    
  }
  sendUriTrack(uriTrack: string ){
    this.playTrackService.pushUri(uriTrack)
  }


}
