import { gql } from "@apollo/client";

export const SEARCH_SPOTIFY_QUERY = gql`
query SearchSpotify($spotifyQuery: String) {
  searchSpotify(spotifyQuery: $spotifyQuery) {
    album {
      image
      name
      released
      totalTracks
    }
    artist
    duration
    link
    popularity
    song
  }
}
`;