import { UploadSong } from "./uploadSong";

export interface UploadAlbum {
  title: string;
  coverUrl: string | undefined;
  scope: "PUBLIC" | "PRIVATE";
  genre: string;
  songs: UploadSong[];
  description:string;
}