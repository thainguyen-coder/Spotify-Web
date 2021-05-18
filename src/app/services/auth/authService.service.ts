import { ScopesBuiler } from './scopes-builer';
import { AuthConfig } from './authConfig';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private requestAuthUrl = 'https://accounts.spotify.com/authorize';
  private authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  private authConfig: AuthConfig = {
    client_id:"",
    response_type:"",
    redirect_uri:"",
    state:"",
    show_dialog:true,
    scope:""

  };
  public authorize(){ 
    this.document.location.href = this.buildAuthUrl();
  }
  //Signal someone, that router can navigate somewhere
  public authorized(): void{
  
    this.authorized$.next(true);
    
  }
  public unAuthorized():void{
    this.authorized$.next(false);
    
    
  }
  public get authorizedStream():Observable<boolean>{
      return this.authorized$.asObservable();

  }
  public configure (config: AuthConfig): AuthServiceService{
    this.authConfig = config;
    return this;

  }
  private buildAuthUrl():string{
    let prams =[];
    for(const[key,value] of Object.entries(this.authConfig)){
      if(typeof(value)=='object'){
        prams.push(`${key}=${(value as string[]).join(" ")}`);
      }
      else{
        prams.push(`${key}=${value}`);
      }
    }
    return `${this.requestAuthUrl}?${prams.join('&')}`;
  }

}
