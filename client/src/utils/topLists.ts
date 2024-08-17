import { shuffleArr } from "@/utils/shuffle";
import { MAX_GENRES, MAX_SONGS } from "@/constants";

export const getTopLists = (music) => {

  if (!music) {
    console.log("Music not ready or not found")
    return {
      topSongs: []
    };
  }

// Function to count genre occurrences
  const countGenres = (songs) => {
    const genreCounts = {};
    for (const song of shuffleArr(songs)) {
      const genre = song.songInfo.genre;
      if (!genre) {
        continue;
      }
      if (!genreCounts[genre]) {
        genreCounts[genre] = {}
      }
      genreCounts[genre].count = (genreCounts[genre].count || 0) + 1;

      if (!genreCounts[genre].songs) {
        genreCounts[genre].songs = []
      }
      if (!(genreCounts[genre].songs.length > MAX_SONGS) && !!song.songInfo.spotify) {
        genreCounts[genre].songs.push(song)
      }

    }
    return genreCounts;
  };

// Get genre counts and sort by count (descending)
  const genreCounts = countGenres(music.songs);
  const sortedGenres = Object.entries(genreCounts)
    .sort((a: any, b: any) => b[1].count - a[1].count) // Sort by count descending
  // .slice(0, MAX_GENRES);

// Return top genres and songs
  const topSongs = sortedGenres.map(([genre, value]: any) => ({ genre, ...value }));

  return {
    topSongs
  }
};