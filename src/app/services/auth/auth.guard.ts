import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Route, Router } from '@angular/router';
import { fromPairs } from 'lodash';

import { AuthServiceService } from './authService.service';
import { TokenService } from './token.service';
import { SpotifyAuthResponse } from './spotify-auth-response.i';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthServiceService, private tokenSvc: TokenService, private _route: Router){}
  
  public canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {
    return this.canActivateChild(next, state);
  }

  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    const response = this.extractApiResponse(next.fragment);
    if(response){
      this.tokenSvc.setAuthToken(response);
      this.authService.authorized();
      this._route.navigate(['/home']);
    }
    return !!response;
  }

  private extractApiResponse(fragment: string): SpotifyAuthResponse | null{
    if(!!fragment){
      return fromPairs(fragment.split('&').map((s) => s.split('='))) as SpotifyAuthResponse;
    }
    return null;
  }
}