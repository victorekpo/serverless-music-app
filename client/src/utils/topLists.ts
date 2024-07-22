import { enhanceWithSpotify } from "@/utils/spotify";

export const getTopLists = (music) => {

  if (!music) {
    console.log("Music not ready or not found")
    return {
      top4Genres: [],
      top20Songs: []
    };
  }

// Function to count genre occurrences
  const countGenres = (songs) => {
    const genreCounts = {};
    for (const song of songs) {
      const genre = song.songInfo.genre;
      if (!genre) {
        continue;
      }
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    }
    return genreCounts;
  };

// Get genre counts and sort by count (descending)
  const genreCounts = countGenres(music.songs);
  const sortedGenres = Object.entries(genreCounts)
    .sort((a: any, b: any) => b[1] - a[1]) // Sort by count descending
    .slice(0, 4); // Get top 4

// Extract top genres
  const top4Genres = sortedGenres.map(([genre]) => genre);

// Get top 20 songs
  const top20Songs = music.songs.filter((song => !!song.spotify)).slice(0, 20);

  return {
    top4Genres,
    top20Songs
  }
};