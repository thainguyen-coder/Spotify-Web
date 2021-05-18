import { environment } from 'src/environments/environment';
import { AuthServiceService } from './authService.service';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { ScopesBuiler } from './scopes-builer';
import { AuthConfig } from './authConfig';

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {
    
    constructor(private tokenSvc: TokenService,
        private authService: AuthServiceService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        
        if (this.tokenSvc.oAuthToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.tokenSvc.oAuthToken}`
                }
            });
        }

        return next.handle(request).pipe(catchError((error: HttpErrorResponse)=>{
            if(error.status == 401){
                // const baseUrl = environment.production? 'https://spotifyweb-d27a5.web.app' : 'http://localhost:4200';
                // const scopes = new ScopesBuiler().build();
                // const ac: AuthConfig = {
                //   client_id: '32da9e39aa4443e69d349930645c1b8e',
                //   response_type: 'token',
                //   redirect_uri: encodeURIComponent(baseUrl+'/callback-login/'),
                //   state: '',
                //   show_dialog: true,
                //   scope: scopes,
                // };
                // this.authService.configure(ac).authorize();   
              
                
            }
            return throwError(error)
        }));
    }
}