import { fetchApi } from '@/fetch';
import { updateMusic } from './update';
// import { readSong } from '@/functions/backend/graphql/utils/music/read';

export const getSpotifyInfo = async (song, opts = {}) => {
  const params = new URLSearchParams(opts);
  console.log('Getting spotify info for', song);
  const response = await fetchApi(`https://spotify.teknixco.net/search/${song}?${params.toString()}`, {
    headers: {
      apikey: process.env.API_KEY || ''
    }
  });

  if (response.error) {
    console.error('Error while getting spotify info', response);
    return response.error;
  }

  return response;
};

export const enhanceWithSpotifyInfo = async (user, songId, song) => {
  let spotifyInfo;
  spotifyInfo = await getSpotifyInfo(song);
  if (!spotifyInfo.length) {
    spotifyInfo = await getSpotifyInfo(song, { match: false });
  }
  console.log('spotify info', spotifyInfo);

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

  return await updateMusic(user, songId, enhancedSpotifyInfo);
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
