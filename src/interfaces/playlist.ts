import { Song } from "./Song";

export interface Playlist {
  djName: string;
  songs: Song[];
  createdAt: string;
}