import { Song } from "./Song";
import { User } from "./User";

export interface PlaylistType {
  id:number;
  title:string;
  coverUrl:string;
  scope:string;
  songs:Song[];
  liked:boolean;
  likeCount:number;
  artist:User;
  createdAt:string;
  updatedAt:string;
}