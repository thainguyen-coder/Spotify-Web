import { AlbumTypeEnum } from "./abumetypeenum";
import { ExternalUrls } from "./externalUrls";

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: "artists";
  uri: string;
 
}