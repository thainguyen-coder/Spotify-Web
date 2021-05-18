export interface RemoveItemPlaylist{
    tracks:Track[];
}

export interface Track {
    uri:       string;
    positions: number[];
}