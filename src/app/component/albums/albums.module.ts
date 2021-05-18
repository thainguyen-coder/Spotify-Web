import { PlayListModule } from './../playlist/playlist.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './albums.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { TimeCustomPipe } from 'src/app/utils/daypipe';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    NzListModule,
    ScrollingModule,
    NzSkeletonModule,
    NzTableModule,
    NzIconModule,
    PlayListModule,
    NzSpinModule
  ],
  declarations: [AlbumsComponent],
  exports:[TimeCustomPipe]
})
export class AlbumsModule { }
