import { environment } from 'src/environments/environment';
import { takeUntil } from 'rxjs/operators';
import { DestroyService } from './services/destroy-service.service';
import { RemoveItemPlaylist } from './model/remove-item-playlist-model';
import { SearchsongQuery } from './state/state/searchsong.query';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlaySpotifyService } from 'src/app/services/play-spotify.service';
import { ScopesBuiler } from './services/auth/scopes-builer';
import { AuthConfig } from './services/auth/authConfig';
import { TokenService } from './services/auth/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  Directive,
  DoCheck,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthServiceService } from './services/auth/authService.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Playlist } from './model/playlist';
import {
  NzContextMenuService,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';

import { SearchsongService } from './state/state/searchsong.service';
import { CreatePlaylistModel } from './model/create-playlist-model';
import { Item } from './model/items';


export interface EditNamePlaylist extends Playlist {
  href: string;
  items: ItemEdittingPlaylist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  uri: string;
}
export interface ItemEdittingPlaylist extends Item {
  isEditting: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Spotify';
  uriPlayList: string;
  state: string;
  dataPlaylist: EditNamePlaylist;
  userId: string;
  nameModel: string;
  domain: string;

  baseUrl: string;
  private _inputElementRef: ElementRef;
  //user: UserProfile ;

  iframeSrc: string;
  user$ = new BehaviorSubject(null);
  private valueFromPlayListdSubscription: Subscription;
  constructor(
    private _service: SpotifyService,
    private searchSongService: SearchsongService,
    private authService: AuthServiceService,
    private tokenService: TokenService,
    private route: Router,
    private playService: PlaySpotifyService,
    private autherService: AuthServiceService,
    private searSongQuery: SearchsongQuery,
    private nzContextMenuService: NzContextMenuService,
    private destroy: DestroyService
  ) {}
  ngDoCheck(): void {}

  //@ViewChildren('input') domReference: QueryList<NgModel>;
  @ViewChild('myInput', { static: false }) set content(content: ElementRef) {
    if (content) {
      this._inputElementRef = content;
      this._inputElementRef.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    if (environment.production) {
      this.baseUrl = 'https://spotifyweb-d27a5.web.app';
    } else this.baseUrl = 'http://localhost:4200';
    //xu li khi f5 de set lai gia tri cho stream
    if (!!this.tokenService.oAuthToken) {
      this.autherService.authorized();
    }
    this.authService.authorizedStream.subscribe((res) => {
      if (res) {
        setTimeout(() => {
          this.getCurrentPlaylist();
          this.displayUser();
        }, 500);
      } else {
        this.user$.next(null);
      }
    });
    this.searSongQuery.checkResultCreate$.subscribe((res) => {
      if (res) {
        this.getCurrentPlaylist();
      }
    });
    this.play();
  }

  login() {
    const scopes = new ScopesBuiler().build();
    const ac: AuthConfig = {
      client_id: '32da9e39aa4443e69d349930645c1b8e',
      response_type: 'token',
      redirect_uri: encodeURIComponent(this.baseUrl + '/callback-login/'),
      state: '',
      show_dialog: true,
      scope: scopes,
    };
    this.authService.configure(ac).authorize();
  }
  displayUser() {
    let userString = localStorage.getItem('user');
    let userParse = JSON.parse(userString);
    if (userParse) {
      this.userId = userParse.id;
      this.user$.next(userParse);
    }
  }
  logout(): void {
    this.tokenService.cleanToken();
    this.authService.unAuthorized();
    this.route.navigateByUrl['/search'];
    alert('Log out successful!');
  }
  public play() {
    this.valueFromPlayListdSubscription = this.playService.ValueUri.subscribe(
      (data) => {
        this.uriPlayList = data;
        this.iframeSrc = 'https://open.spotify.com/embed/?uri=' + data;
      }
    );
  }
  // public ngOnDestroy() {
  //   this.valueFromPlayListdSubscription.unsubscribe();
  // }

  getCurrentPlaylist() {
    this._service
      .getCurrentPlaylist()
      .pipe(takeUntil(this.destroy.destroyed$))
      .subscribe((data: Playlist) => {
        this.dataPlaylist = {
          ...data,
          items: data.items.map((item) => {
            return { ...item, isEditting: false };
          }),
        };
      });
  }

  //context menu
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  deleteItemPlaylist(playlistId: string) {
    this._service.removeItemPlaylist(playlistId).subscribe((data: any) => {
      this.dataPlaylist = {
        ...data,
        items: data.items.map((item) => {
          return { ...item, isEditting: false };
        }),
      };
    });
  }
  renameItemPlaylist(playlistId: string, i) {
    const filters = this.dataPlaylist.items.filter(
      (e) => e.id == playlistId
    )[0];
    const model: CreatePlaylistModel = {
      name: this.nameModel,
      description : 'Nguyên Trần',
      public: filters?.public,
    };

    this._service.changePlaylistDetails(playlistId, model).subscribe({
      next: (dataPlaylisNew) => {
        this.dataPlaylist.items[i].name = this.nameModel;
      },
      complete: () => {
        const temp = { ...this.dataPlaylist };
        temp.items[i].isEditting = false;
        this.dataPlaylist = { ...temp };
      },
    });
  }
  showInput(playlistId: string, i) {
    this.dataPlaylist = {
      ...this.dataPlaylist,
      items: this.dataPlaylist.items.map((item) => {
        return { ...item, isEditting: false };
      }),
    };
    const fill = this.dataPlaylist.items.filter((e) => e.id == playlistId)[0];
    const model: CreatePlaylistModel = {
      name: (this.nameModel = fill?.name),
      description: fill?.description,
      public: fill?.public,
    };
    const temp = { ...this.dataPlaylist };

    temp.items[i].isEditting = true;

    this.dataPlaylist = { ...temp };
  }
  
  ngOnDestroy(): void {
    this.searchSongService.removeState();
  }
}
