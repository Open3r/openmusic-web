import { Song } from './Song';
import { User } from './User';

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

export interface AlbumTypeNoSong{
  id: number,
  title: string,
  description: string,
  coverUrl: string,
  artist: {
    id: 0,
    nickname: string,
    email: string,
    provider: string,
    avatarUrl: string,
    role: string,
    status: string,
    genres: [
      string
    ],
    createdAt: string,
    updatedAt: string
  }
}