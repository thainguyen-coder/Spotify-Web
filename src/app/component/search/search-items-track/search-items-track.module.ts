import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemsTrackComponent } from './search-items-track.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzIconModule

  ],
  declarations: [SearchItemsTrackComponent],
  exports:[SearchItemsTrackComponent]
})
export class SearchItemsTrackModule { }
