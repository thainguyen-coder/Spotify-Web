import { Item } from "./items";

export interface Playlist{
    href: string;
    items: Item[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
     uri: string;
}