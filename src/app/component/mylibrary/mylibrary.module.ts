import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MylibraryComponent } from './mylibrary.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { PlayListModule } from '../playlist/playlist.module';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    RouterModule,
    UserProfileModule,
    NzGridModule  ],
  declarations: [MylibraryComponent],
  exports:[MylibraryComponent]
})
export class MylibraryModule { }
