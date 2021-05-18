import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PlaySpotifyService{
    private uriTrack : Subject<string> = new Subject();

    public get ValueUri(){
        return this.uriTrack;
    }

    public pushUri(uri: string){
        return this.uriTrack.next(uri)
    }
}