import { PlaylistComponent } from './playlist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import {ScrollingModule} from '@angular/cdk/scrolling';
// import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TimeCustomPipe } from 'src/app/utils/daypipe';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SearchOfCreateModule } from '../search_of_create/search-of-create/search-of-create.module';
@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    NzListModule,
    ScrollingModule,
    NzSkeletonModule,
    NzTableModule,
    NzIconModule,
    NzSpinModule,
    NzGridModule,
    SearchOfCreateModule
    
    
  ],
  declarations: [PlaylistComponent,TimeCustomPipe],
  exports:[TimeCustomPipe]
})
export class PlayListModule { }