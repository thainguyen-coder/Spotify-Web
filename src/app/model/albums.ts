import { AlbumTypeEnum } from "./abumetypeenum";
import { Artist } from "./artists";
import { Item } from "./items";

export interface Albums {

    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;

    album_type ?: AlbumTypeEnum;
    artists?: Artist[];
    available_markets?: string[];
    release_date?: Date;
    release_date_precision?: "day";
    total_tracks?: number;
    type ?: AlbumTypeEnum;
    uri ?: string;
}