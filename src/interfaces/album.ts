import { Song } from "./Song";
import { User } from "./User";

export interface AlbumType{
  id:number;
  title:string;
  description:string;
  coverUrl:string;
  liked:boolean;
  likeCount:number;
  songs:Song[];
  artist:User;
  createdAt:string;
  updatedAt:string;
}