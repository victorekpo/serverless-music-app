export const typeDefs = `
  type SongInfo {
    _id: ID!
    artist: String!
    song: String!
    album: String
    genre: String
    BPM: String
    speed: String
    mood: String
    tags: String
    quotes: String
    spotify: SpotifyInfo
  }

  type SpotifyInfo {
    song: String
    artist: [String]
    popularity: Int
    duration: String
    link: String
    album: SpotifyAlbumInfo
  }
  
  type SpotifyAlbumInfo {
    name: String
    released: String
    totalTracks: Int
    image: String
  }
  
  type Song {
    _id: ID!
    song: String!
    songInfo: SongInfo!
  }
  
  type MusicCollection {
    _id: ID!
    user: String!,
    songs: [Song]
  }
  
  input SongInput {
    artist: String
    song: String
    album: String
    genre: String
    BPM: String
    speed: String
    mood: String
    tags: String
    quotes: String
    spotify: SpotifyInfoInput
  }
  
  input SpotifyInfoInput {
    song: String
    artist: [String]
    popularity: Int
    duration: String
    link: String
    album: SpotifyAlbumInfoInput
  }
  
  input SpotifyAlbumInfoInput {
    name: String
    released: String
    totalTracks: Int
    image: String
  }
  
  type Query {
    getAllMusic(user: String!): MusicCollection
    getSong(song: String!): Song
    searchMusic(songQuery: String, artistQuery: String, albumQuery: String, genreQuery: String, tagsQuery: String, quotesQuery: String): [Song]
  }
  
  type Mutation {
    addMusic(user: String!, song: SongInput!): Song
    updateMusic(user: String!, oldSongId: String!, song: SongInput!): Song
    enhanceWithSpotifyInfo(user: String!, songId: String!, song: String!): Song
  }
`;