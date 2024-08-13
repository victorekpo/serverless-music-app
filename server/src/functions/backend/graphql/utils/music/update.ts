import { MusicCollections } from '@/functions/backend/graphql/db/models/Music';
import type { MusicCollection, Song, SongInfo } from '@/@types/Music';

export const updateMusic = async (user: string, id: string, updatedSongInfo: Partial<SongInfo>): Promise<Song | null> => {
  const songId = id;
  try {
    // Step 1. Get specific fields to update
    const updateFields = Object.keys(updatedSongInfo).reduce((acc, key) => {
      acc[`songs.$.songInfo.${key}`] = updatedSongInfo[key];
      return acc;
    }, {});

    // Step 2. Update specific attributes of the song in MusicCollections
    await MusicCollections.findOneAndUpdate(
      { user, 'songs._id': songId },
      { $set: updateFields }
    );

    // Step 3. Update the `song` property based on the updated `songInfo`
    if (updatedSongInfo.artist || updatedSongInfo.song) {
      const newSong = `${updatedSongInfo.artist || ''} -- ${updatedSongInfo.song || ''}`.trim();
      await MusicCollections.findOneAndUpdate(
        { user, 'songs._id': songId },
        { $set: { 'songs.$.song': newSong } }
      );
    }

    // Step 4: Retrieve the updated song info
    const musicCollection: MusicCollection | null = await MusicCollections.findOne(
      { user, 'songs._id': songId },
      { 'songs.$': 1 }
    );

    if (!musicCollection) {
      throw new Error(`Failed to find updated song with ID '${songId}'`);
    }

    const updatedSong: Song = musicCollection.songs[0]; // The updated song is the first (and only) element in the array

    console.info(`Song with ID '${songId}' updated successfully.`);
    console.log('Updated Song', JSON.stringify(updatedSong));
    return updatedSong;
  } catch (error) {
    console.error('Error updating song:', error);
    return null;
  }
};
