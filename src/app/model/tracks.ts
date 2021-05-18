import { Albums } from "./albums";
import { Artist } from "./artists";
import { ExternalUrls } from "./externalUrls";

export interface Track {
    after?:  string;
    before?: string;
    album: Albums;
    artists?: Artist;
    available_markets ?: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: null | string;
    track_number: number;
    type: "track";
    uri: string;
}
