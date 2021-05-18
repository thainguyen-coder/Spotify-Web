import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlaylistComponent } from './create-playlist.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SearchOfCreateModule } from '../search_of_create/search-of-create/search-of-create.module';
import { PlayListModule } from '../playlist/playlist.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule,
    NzCardModule,
    NzInputModule,
    NzGridModule,
    SearchOfCreateModule,
    PlayListModule
  ],
  declarations: [CreatePlaylistComponent],
  exports:[CreatePlaylistComponent]
})
export class CreatePlaylistModule {}
