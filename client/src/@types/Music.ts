// import { Model, ObjectId } from "mongoose";

export interface Song {
  _id: any; // ObjectId;
  song: string;
  songInfo: SongInfo
}

export interface SongInfo {
  artist: string;
  song: string;
  genre: string;
  album: string;
  BPM: string;
  speed: string;
  mood: string;
  tags: string;
  quotes: string;
}

export interface MusicCollection {
  _id: any; // ObjectId;
  user: string;
  songs: Song[];
  save: any
}