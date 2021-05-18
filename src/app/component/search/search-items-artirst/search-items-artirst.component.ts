import { Component, Input, OnInit } from '@angular/core';
import { SearchArtirstModel } from 'src/app/model/res/search.artirst-model';

@Component({
  selector: 'app-search-items-artirst',
  templateUrl: './search-items-artirst.component.html',
  styleUrls: ['./search-items-artirst.component.scss']
})
export class SearchItemsArtirstComponent implements OnInit {
  @Input() artirst:SearchArtirstModel;
  constructor() { }

  ngOnInit() {
  }

}
