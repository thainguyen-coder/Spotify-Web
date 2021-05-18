import { Albums } from './../albums';
import { BasePagingRes } from './basePaging.res-model';
import { SearchAlbumModel } from './search.album-model';
import { SearchArtirstModel } from './search.artirst-model';
export interface SearchResModel{
    tracks: BasePagingRes<SearchAlbumModel>;
    artists : BasePagingRes<SearchArtirstModel>;
}