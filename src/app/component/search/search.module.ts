import { SearchItemsArtirstModule } from './search-items-artirst/search-items-artirst.module';
import { ArtirstComponent } from './../artirst/artirst.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtirstModule } from '../artirst/artirst.module';
import { SearchItemsTrackModule } from './search-items-track/search-items-track.module';
import { SearchItemsAlbumModule } from './search-items-album/search-items-album.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MyFilterPipe } from 'src/app/utils/filter-items-pipe';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NzCardModule,
        ReactiveFormsModule,
         SearchItemsArtirstModule,
         SearchItemsTrackModule,
         SearchItemsAlbumModule,
         NzGridModule
    ],
    declarations: [SearchComponent,MyFilterPipe]
})
export class SearchModule { }
