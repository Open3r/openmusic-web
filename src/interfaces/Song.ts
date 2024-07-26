import { Artist } from "./artist";

export interface Song {
  id: number;
  title: string;
  artist: Artist;
  url: string;
  thumbnailUrl: string;
  likes:[];
  genre:string;
  scope:string;
}