import { Artist } from "./artists";
import { ExternalUrls } from "./externalUrls";
import { Track } from "./tracks";
import {Image} from "./images";
import { AlbumTypeEnum } from "./abumetypeenum";

export interface Item {
    description ?: string;
    album_type:             AlbumTypeEnum;
    artists:                Artist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
   images:                 Image[];
    name:                   string;
    release_date:           Date;
   // release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumTypeEnum;
    uri:                    string;
    public ?: boolean;
    track:     Track;
    played_at: Date;
}
