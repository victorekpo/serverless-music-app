import { gql } from "@apollo/client";

export const ADD_MUSIC_QUERY = gql`
mutation ($user: String! $song: SongInput!) {
  addMusic(user: $user, song: $song) {
    song
    songInfo {
      artist
      song
      genre
      album
      BPM
      speed
      mood
      tags
      quotes
      spotify {
        artist
        song
        duration
        link
        popularity
        album {
          image
          name
          released
          totalTracks
        }
      }
    }
  }
}
`;