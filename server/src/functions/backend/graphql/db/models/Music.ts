import { model, Schema, Document, models } from 'mongoose';
// import { SongInfo } from '@/@types/Music';

// interface ISongStats extends Document {
//   views: number;
//   plays: number;
//   edits: number;
//   rating: number;
// }

interface ISongInfo extends Document {
  artist: string;
  song: string;
  album?: string;
  genre?: string;
  BPM?: string;
  speed?: string;
  mood?: string;
  tags?: string;
  quotes?: string;
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
  // stats?: ISongStats
  createdAt?: Date;
  updatedAt?: Date;
}

interface ISongs extends Document {
  song: string;
  songInfo: ISongInfo;
  createdAt?: Date;
  updatedAt?: Date;
}

// interface ICollectionStats extends Document {
//   top4Genres: string[];
//   top20Songs: SongInfo[];
// }

interface IMusicCollection extends Document {
  songs: ISongs[];
  // stats: ICollectionStats;
  user: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const SongInfoSchema: Schema<ISongInfo> = new Schema({
  artist: {
    type: String,
    required: [true, 'Artist name is required!'],
    trim: true,
  },
  song: {
    type: String,
    required: [true, 'Song title is required!'],
    trim: true,
  },
  album: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  BPM: {
    type: String,
    trim: true,
  },
  speed: {
    type: String,
    trim: true,
  },
  mood: {
    type: String,
    trim: true,
  },
  tags: {
    type: String,
    trim: true,
  },
  quotes: {
    type: String,
    trim: true,
  },
  spotify: {
    type: {
      song: { type: String, trim: true },
      artist: { type: [String], trim: true },
      popularity: { type: Number },
      duration: { type: String, trim: true },
      link: { type: String, trim: true },
      album: {
        name: { type: String, trim: true },
        released: { type: String, trim: true },
        totalTracks: { type: Number },
        image: { type: String, trim: true },
      },
    },
    default: null, // Allows spotify field itself to be null or undefined
  },
  // stats: {
  //   type: {
  //     views: { type: Number, default: 0 },
  //     plays: { type: Number, default: 0 },
  //     edits: { type: Number, default: 0 },
  //     rating: { type: Number, default: 0 }
  //   },
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
});

const SongsSchema: Schema<ISongs> = new Schema({
  song: {
    type: String,
    required: [true, 'Song title is required!'],
    trim: true,
  },
  songInfo: {
    type: SongInfoSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
});

const MusicCollectionsSchema: Schema<IMusicCollection> = new Schema({
  songs: {
    type: [SongsSchema],
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // stats: {
  //   type: {
  //     top4Genres: { type: [String], default: [] },
  //     top20Songs: { type: [SongInfoSchema], default: [] }
  //   },
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp,
  },
});


export const MusicCollections = models.MusicCollections || model<IMusicCollection>('MusicCollections', MusicCollectionsSchema);
