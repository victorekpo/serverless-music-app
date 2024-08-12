import { gql } from "@apollo/client";

export const UPDATE_MUSIC_QUERY = gql`
mutation ($user: String!, $oldSongId: String!, $song: SongInput!) {
  updateMusic(user: $user, oldSongId: $oldSongId, song: $song) {
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