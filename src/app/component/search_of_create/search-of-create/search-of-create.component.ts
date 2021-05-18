import { PlaySpotifyService } from './../../../services/play-spotify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { SearchsongService } from 'src/app/state/state/searchsong.service';
import { Observable } from 'rxjs';
import { Albums } from 'src/app/model/albums';
import { SearchsongQuery } from 'src/app/state/state/searchsong.query';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-of-create',
  templateUrl: './search-of-create.component.html',
  styleUrls: ['./search-of-create.component.scss'],
})
export class SearchOfCreateComponent implements OnInit, OnDestroy {
  searchSubject = new Subject<string>();
  results$: Observable<Albums>;
  valueInput: string;
  @Output() clickCreate = new EventEmitter<any>();
  constructor(
    private searchSongService: SearchsongService,
    private serQuery: SearchsongQuery,
    private route: ActivatedRoute,
    private router: Router,
    private playTrackService: PlaySpotifyService
  ) {}

  ngOnInit() {
    this.resultSearch();
    this.results$ = this.serQuery.result$;

    this.router.events.subscribe((): any => {
      //????
      this.searchSubject.next(' ');
    });

    this.route.params.subscribe(() => {
   
      this.searchSubject.next(' ');
      setTimeout(() => {}, 300);
    });
  }

  //seatch
  search(query: string) {
    if (query) {
    

      this.searchSubject.next(query);
    } else {
      console.log('error nhen m');
    }
  }

  //result of search
  resultSearch() {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((query) => {
      
          this.valueInput = query;
          if (query.trim()) {
          
            return this.searchSongService.get(query, 'track');
          } else {
            return of(null);
          }
        })
      )
      .subscribe(() => {});
  }
  addItem(uri: string, id: string) {
    this.clickCreate.emit({ uri: uri, id: id });
  }
  sendUriTrack(idTrack: string) {
    this.playTrackService.pushUri(idTrack);
  }
  ngOnDestroy(): void {
    this.searchSubject.complete();
  }
}
