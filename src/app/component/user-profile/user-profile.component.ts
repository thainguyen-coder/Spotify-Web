import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor( private _serviceSpotify: SpotifyService) { }

  ngOnInit() {
    this.UserProfile();
  }

  UserProfile(){
    this._serviceSpotify.getCurrentUserProfile().subscribe((data:any) =>{
      
        
    })
  }

}
