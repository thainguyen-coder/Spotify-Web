import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtirstComponent } from './artirst.component';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TimeCustomPipe } from 'src/app/utils/daypipe';
import { PlayListModule } from '../playlist/playlist.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    RouterModule,
    NzTableModule,
    NzIconModule,
    PlayListModule,
    NzGridModule
  ],
  declarations: [ArtirstComponent],
  exports: [ArtirstComponent] 
})
export class ArtirstModule { }
