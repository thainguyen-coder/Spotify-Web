import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemsAlbumComponent } from './search-items-album.component';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [CommonModule, RouterModule, NzCardModule, NzIconModule],
  declarations: [SearchItemsAlbumComponent],
  exports: [SearchItemsAlbumComponent],
})
export class SearchItemsAlbumModule {}
