import { Song } from "./Song";

export interface Album{
  artist: string;
  songs : Song[];
  release: string;
}