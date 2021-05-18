import { Image } from './../images';
import { Followers } from './../followers';
import { ExternalUrls } from "../externalUrls";

export interface SearchArtirstModel{
    external_urls: ExternalUrls;
    followers : Followers;
    href : string;
    id: string;
    images : Image;
     name : string;
     popularity : string;
     type: string;
     uri: string;


}