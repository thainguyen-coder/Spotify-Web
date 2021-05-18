import { AlbumsModule } from './component/albums/albums.module';
import { PlaySpotifyService } from './services/play-spotify.service';
import { PlayListModule } from './component/playlist/playlist.module';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthServiceService } from './services/auth/authService.service';
import { TokenService } from './services/auth/token.service';
import { RouterModule } from '@angular/router';
import { CallbackLoginComponent } from './component/callbackLogin/callbackLogin/callbackLogin.component';
import { HomeModule } from './component/home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SearchComponent } from './component/search/search.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NavbarModule } from './component/navbar/navbar.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpModule } from '@angular/http';
import { SearchModule } from './component/search/search.module';
import { ArtirstModule } from './component/artirst/artirst.module';
import { SpotifyAuthInterceptor } from './services/auth/spotify-auth.interceptor';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { UrlPipe } from './utils/urlPipe';
import { MylibraryModule } from './component/mylibrary/mylibrary.module';
import { CreatePlaylistModule } from './component/create-playlist/create-playlist.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { SearchOfCreateModule } from './component/search_of_create/search-of-create/search-of-create.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzMenuModule } from 'ng-zorro-antd/menu';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CallbackLoginComponent,
    UrlPipe,

    // NavbarComponent,
    //SearchComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavbarModule,
    NzLayoutModule,
    NzIconModule,
    HttpModule,
    HomeModule,
    SearchModule,
    
    MylibraryModule,
    RouterModule,
    PlayListModule,
    AlbumsModule,
   CreatePlaylistModule,
    NzDropDownModule,
    NzInputModule,
    NzMenuModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NzResultModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    TokenService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyAuthInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
