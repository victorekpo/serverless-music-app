import { Model, ObjectId } from 'mongoose';

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
  spotify?: {
    song: string,
    artist: string[],
    popularity: number,
    duration: string,
    link: string,
    album: {
      name: string,
      released: string,
      totalTracks: number,
      image: string
    }
  }
}

export interface Song {
  _id: ObjectId;
  song: string;
  songInfo: SongInfo
}


export interface MusicCollection {
  _id: ObjectId;
  user: string;
  songs: Song[];
  save: any
}