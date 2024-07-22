import { enhanceWithSpotify } from "@/utils/spotify";

export const getTopLists = async (music) => {

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
  const songs = music.songs.slice(0, 5);
  // Enhance songs with Spotify data asynchronously (use Promise.all)
  const top20Songs = await Promise.all(songs.map(enhanceWithSpotify));

  // // Sort songs alphabetically (optional)
  // enhancedSongs.sort((a, b) => a.song.localeCompare(b.song));

  return {
    top4Genres,
    top20Songs
  }
};