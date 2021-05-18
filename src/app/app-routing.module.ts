import { AlbumsComponent } from './component/albums/albums.component';
import { MylibraryComponent } from './component/mylibrary/mylibrary.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { AuthGuard } from './services/auth/auth.guard';
import { CallbackLoginComponent } from './component/callbackLogin/callbackLogin/callbackLogin.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtirstComponent } from './component/artirst/artirst.component';
import { CreatePlaylistComponent } from './component/create-playlist/create-playlist.component';
import { SearchOfCreateComponent } from './component/search_of_create/search-of-create/search-of-create.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent, redirectTo: '' },
  { path: 'artist/:id', component: ArtirstComponent },
  {
    path: 'callback-login',
    canActivate: [AuthGuard],
    component: CallbackLoginComponent,
  },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: '', component: HomeComponent },
  {
    path: 'playlist',
    component: MylibraryComponent,
    // loadChildren:()=> import('./component/mylibrary/mylibrary.module').then(p => p.MylibraryModule)
  },
  {
    path: 'album/:id',
    component: AlbumsComponent,
  },
  {
    path: 'create',
    component: CreatePlaylistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
