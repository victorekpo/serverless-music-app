import { MusicCollections } from '@/functions/backend/graphql/db/models/Music';
import type { MusicCollection } from '@/@types/Music';

export const readMusic = async (user: string = '667ced56d3ac2d92c0fa5326') => {
  try {
    // Step 1:  Find the music collection by user's ID
    const musicCollection: MusicCollection | null = await MusicCollections.findOne({ user });

    if (!musicCollection) {
      throw new Error('Music collection not found for user');
    }

    // Step 2: Return the music collection
    // console.log(JSON.stringify(musicCollection, null, 2))
    return musicCollection;
  } catch (error) {
    console.error('Error reading music collection:', error);
    return null;
  }
};

export const readSong = async (user: string = '667ced56d3ac2d92c0fa5326', songId) => {
  try {
    const searchSong = await MusicCollections.findOne({ user, 'songs._id': songId }, { 'songs.$': 1 });
    return searchSong._doc.songs[0];
  } catch (error) {
    console.error('Error reading song:', error);
    return null;
  }
};
