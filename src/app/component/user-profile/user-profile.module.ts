import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
    
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
