import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemsArtirstComponent } from './search-items-artirst.component';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    RouterModule,
    NzIconModule
  ],
  declarations: [SearchItemsArtirstComponent],
  exports: [SearchItemsArtirstComponent] 
})
export class SearchItemsArtirstModule { }
