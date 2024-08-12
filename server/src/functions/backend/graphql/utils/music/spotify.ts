import { fetchApi } from '@/fetch';
import { updateMusic } from './update';
// import { readSong } from '@/functions/backend/graphql/utils/music/read';

export const getSpotifyInfo = async (song) => {
  return await fetchApi(`https://spotify.teknixco.net/search/${song}`, {
    headers: {
      apikey: process.env.API_KEY || ''
    }
  });
};

export const enhanceWithSpotifyInfo = async (user, songId, song) => {
  const spotifyInfo = await getSpotifyInfo(song);

  // const searchSong = await readSong(user, songId);
  // const { _doc: { songInfo: { _id, createdAt, updatedAt, _doc: { ...songInfo } } } } = searchSong;
  // delete songInfo._id;
  // delete songInfo.createdAt;
  // delete songInfo.updatedAt;

  const enhancedSpotifyInfo = {
    // ...songInfo,
    spotify: spotifyInfo.data[0]
  };
  console.log('enhancedSpotifyInfo', JSON.stringify(enhancedSpotifyInfo));

  await updateMusic(user, songId, enhancedSpotifyInfo);
};

export const enhanceAllWithSpotify = async (allMusic, user) => {
  const batchSize = 5;

  for (let i = 0; i < allMusic.songs.length; i += batchSize) {
    const batchNumber = i / batchSize;
    const totalBatches = allMusic.songs.length / batchSize;
    console.log(`Starting batch ${batchNumber} of ${totalBatches}`);
    const batch = allMusic.songs.slice(i, i + batchSize);

    await Promise.all(
      batch.map(({ _id, song }) => enhanceWithSpotifyInfo(user, _id.toString(), song))
    );
    console.log(`Completed batch ${batchNumber} of ${totalBatches}`);
  }
};
