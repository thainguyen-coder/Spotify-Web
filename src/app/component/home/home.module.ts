import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TimeCustomPipe } from 'src/app/utils/daypipe';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    RouterModule,
    NzGridModule
    
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
