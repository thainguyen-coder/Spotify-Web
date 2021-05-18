import { SearchResModel } from './../model/res/search.res-model';
import { Artist } from './../model/artists';
import { Item } from './../model/items';
import { Track } from './../model/tracks';
import { Albums } from './../model/albums';
import { Playlist } from './../model/playlist';
import { SpotifyScope } from './../model/ScopeSpotify';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { catchError, debounceTime, delay, map, tap } from 'rxjs/operators';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, of } from 'rxjs';
import { CreatePlaylistModel } from '../model/create-playlist-model';
import { RemoveItemPlaylist } from '../model/remove-item-playlist-model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private realeaseUrl: string;
  private searchUrl: string;
  private searchPlaylist: string;
  private artistUrl: string;
  private albumUrl: string;
  private playListUrl: string;

  private recentlyUrl: string;
  private currentPlaylistUrl: string;
  private playTrackUrl: string;
  private playAlbumUrl: string;
  private aTrackUrl: string;
  private userProfileUrl: string;
  private newReleasesUrl: string;
  private createPlaylistUrl: string;
  private addItemPlaylisUrl: string;
  private removeItemPlaylistUrl: string;
  private artistTopTrackUrl: string;
  private playlistDetailUrl: string;
  private user: {} = {};
  private user$: BehaviorSubject<{}>;
  private url: string = 'https://api.spotify.com/v1/me/';

  constructor(private _http: HttpClient) {}

  //lấy các bài hát người dùng vừa mới nghe
  getRecentlyPlayedTracks(after?: string, before?: string) {
    if (after && before) {
      this.recentlyUrl =
        this.url + 'player/recently-played?limit=100&after=' + after;
    }
    this.recentlyUrl = this.url + 'player/recently-played?limit=10';
    return this._http.get(this.recentlyUrl).pipe(map((res) => res));
  }

  // public getNewRealeas(access_token: string = null) {
  //   this.realeaseUrl = 'https://api.spotify.com/v1/browse/new-releases?limit=20';
  //   return this._http.get(this.realeaseUrl).pipe(map(res => res));
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      (result as any) = error;
      return of(result as T);
    };
  }
  //lấy danh sách phát hiện tại
  public getCurrentPlaylist() {
    this.currentPlaylistUrl = this.url + 'playlists?limit=10&offset=0';
    return this._http
      .get<Playlist>(this.currentPlaylistUrl)
      .pipe(map((res) => res));
  }
  //lấy album
  public getAlbum(albumId: string) {
    this.albumUrl = 'https://api.spotify.com/v1/albums/' + albumId;
    return this._http.get<Albums>(this.albumUrl).pipe(map((res) => res));
  }
  //lấy danh sách bài hát
  public getPlayList(playListId: string) {
    this.playListUrl = 'https://api.spotify.com/v1/playlists/' + playListId;
    return this._http
      .get<Playlist | Track | Item>(this.playListUrl)
      .pipe(map((res) => res));
  }

  //lay mot bai hat
  public getATrack(trackId: string) {
    this.aTrackUrl = 'https://api.spotify.com/v1/tracks/' + trackId;
    return this._http.get<Track>(this.aTrackUrl).pipe(map((res) => res));
  }

  //get artirsts
  public getArtirst(id: string) {
    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    return this._http.get(this.artistUrl).pipe(map((res) => res));
  }

  // search track/artirst
  public seachTrackOrMusic(query: string, type: string) {
    this.searchUrl =
      'https://api.spotify.com/v1/search?q=' +
      query +
      '&offset=0&limit=20&type=' +
      type +
      '&market=US';
    return this._http.get<SearchResModel>(this.searchUrl);
  }

  // search in createplaylist
  public searchCreatePlaylist(query: string, type: string) {
    this.searchPlaylist = `https://api.spotify.com/v1/search?q=${query}&offset=0&limit=20&type=${type}&market=US`;
    return this._http.get<SearchResModel>(this.searchPlaylist);
  }

  //Get a List of New Releases
  public getNewReleases() {
    this.newReleasesUrl =
      'https://api.spotify.com/v1/browse/new-releases?country=VN&limit=8&offset=1';
    return this._http.get<Albums>(this.newReleasesUrl).pipe(map((res) => res));
  }

  //Get Current User's Profile
  public getCurrentUserProfile() {
    this.userProfileUrl = 'https://api.spotify.com/v1/me';
    return this._http.get(this.userProfileUrl).pipe(map((res) => res));
  }

  //Create a Playlist
  public createPlaylist(userId: string, model: CreatePlaylistModel) {
    this.createPlaylistUrl =
      'https://api.spotify.com/v1/users/' + userId + '/playlists';
    return this._http
      .post(this.createPlaylistUrl, model)
      .pipe(map((res) => res));
  }

  //add item to playlist
  public addItemPlaylist(playList_Id: string, uris: string) {
    this.addItemPlaylisUrl = `https://api.spotify.com/v1/playlists/${playList_Id}/tracks?uris=${uris}`;
    return this._http
      .post(this.addItemPlaylisUrl, null)
      .pipe(map((res) => res));
  }
  //remove Item Playlist

  public removeItemPlaylist(playList_Id: string) {
    this.removeItemPlaylistUrl = `https://api.spotify.com/v1/playlists/${playList_Id}/tracks`;
    return this._http
      .delete(this.removeItemPlaylistUrl)
      .pipe(map((res) => res));
  }

  // get artist top track
  public artistTopTrack(idArtist: string) {
    this.artistTopTrackUrl = `https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=VN`;
    return this._http.get(this.artistTopTrackUrl).pipe(map((res) => res));
  }
  //Change a Playlist's Details
  public changePlaylistDetails(playlistId: string, model: CreatePlaylistModel) {
    this.playlistDetailUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
    return this._http
      .put(this.playlistDetailUrl, model)
      .pipe(map((res) => res));
  }
}
