
import { AlbumTypeNoSong } from "./album";
import { User } from "./User";

export interface Song {
  id: number;
  title: string;
  artist: User;
  url: string;
  thumbnailUrl: string;
  liked:boolean;
  likeCount:number;
  genre:string;
  scope:string;
  album:AlbumTypeNoSong;
}