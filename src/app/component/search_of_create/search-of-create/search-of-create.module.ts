
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchOfCreateComponent } from './search-of-create.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms'
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzGridModule } from 'ng-zorro-antd/grid';
@NgModule({
  imports: [
    CommonModule,
    NzCardModule,
    NzInputModule,
    FormsModule,
    NzGridModule,
    NzIconModule
  ],
  declarations: [SearchOfCreateComponent],
  exports:[SearchOfCreateComponent]
})
export class SearchOfCreateModule { }
