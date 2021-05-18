import { SpotifyService } from 'src/app/services/spotify.service';
import { SpotifyAuthResponse } from './spotify-auth-response.i';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServiceService } from './authService.service';

@Injectable()
export class TokenService {
  private token: string = '';
  private dataUser: any = '';
  constructor(
    private route: Router,
    private _service: SpotifyService,
    private autherService: AuthServiceService
  ) {}
  private token$ = new BehaviorSubject(this.token);

  public get oAuthToken(): string {
    const access_token = localStorage.getItem('access_token');
    return access_token ? (this.token = access_token) : '';
  }
  public cleanToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user')
    this.token = '';
    this.token$.next(this.token);
    this.route.navigate(['/search']);
  }
  public get authHeader(): { [name: string]: string } {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }
  public get authTokens(): Observable<string> {
    return this.token$.asObservable();
  }
  public setAuthToken(spotifyResponse: SpotifyAuthResponse): boolean {
    if (!!spotifyResponse && !!spotifyResponse.access_token) {
     
      
      this.token = spotifyResponse.access_token;
      localStorage.setItem('access_token', this.token);
    } else {
      this.token = '';
    }
    this.token$.next(this.token);
    return !!this.token;
  }
}
