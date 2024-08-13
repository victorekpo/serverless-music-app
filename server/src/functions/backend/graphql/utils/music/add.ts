import { MusicCollections } from '@/functions/backend/graphql/db/models/Music';
import type { MusicCollection, Song, SongInfo } from '@/@types/Music';
import { getSpotifyInfo } from '@/functions/backend/graphql/utils/music/spotify';

export const addMusic = async (user: string, newSongData: SongInfo): Promise<Song | null> => {
  try {
    // Step 1: Get the MusicCollection
    const musicCollection: MusicCollection | null = await MusicCollections.findOne({ user });

    if (!musicCollection) {
      throw new Error('Music collection not found for user');
    }

    // Step 2: Create the song track and check if it already exists
    const songTrack = `${newSongData.artist} -- ${newSongData.song}`;
    const songExists = musicCollection.songs.some(song => song.song === songTrack);

    if (songExists) {
      console.info('Song already exists in the music collection.');
      throw new Error('Track already exists, check track name');
    }

    // Step 3: Add the new song to the MusicCollection
    let spotifyInfo: any = null;

    try {
      spotifyInfo = await getSpotifyInfo(songTrack.replaceAll('-- ', '').replaceAll('--', ''));
    } catch (err) {
      console.error('Error occurred while adding Spotify Info to new track', err);
    }
    const newSong = <Song>{
      song: songTrack,
      songInfo: { ...newSongData, spotify: spotifyInfo?.data?.[0] || null }
    };
    musicCollection.songs.push(newSong);

    // Step 4: Save the updated MusicCollection
    await musicCollection.save();
    console.info('New song added to music collection.');
    return newSong;
  } catch (error) {
    const errorMessage = `Error adding new song: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};