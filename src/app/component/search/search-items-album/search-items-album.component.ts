import { SearchAlbumModel } from './../../../model/res/search.album-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-items-album',
  templateUrl: './search-items-album.component.html',
  styleUrls: ['./search-items-album.component.scss']
})
export class SearchItemsAlbumComponent implements OnInit {

  @Input()album:SearchAlbumModel;
  constructor() { }

  ngOnInit() {
  }
  viewAlbum(idAlbum:string){
   
    
  }

}
