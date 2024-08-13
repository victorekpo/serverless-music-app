import { fetchApi } from '@/fetch';
import { updateMusic } from './update';
// import { readSong } from '@/functions/backend/graphql/utils/music/read';

export const getSpotifyInfo = async (song, opts = {}) => {
  const params = new URLSearchParams(opts);
  console.log('Getting spotify info for', song);

  let response: any;
  response = await fetchApi(`https://spotify.teknixco.net/search/${song}?${params.toString()}`, {
    headers: {
      apikey: process.env.API_KEY || ''
    }
  });

  if (!response?.data?.length) {
    console.log('No data found, retrying without match');
    response = await fetchApi(`https://spotify.teknixco.net/search/${song}?${new URLSearchParams({
      ...opts,
      match: 'false'
    }).toString()}`, {
      headers: {
        apikey: process.env.API_KEY || ''
      }
    });
  }

  if (!(song.includes(response?.data?.[0]?.song) || response?.data?.[0]?.song?.includes(song))) {
    return null;
  }

  if (response.error) {
    console.error('Error while getting spotify info', response);
    return response.error;
  }

  return response;
};

export const enhanceWithSpotifyInfo = async (user, songId, song) => {
  const spotifyInfo = await getSpotifyInfo(song);
  console.log('spotify info', spotifyInfo);

  // const searchSong = await readSong(user, songId);
  // const { _doc: { songInfo: { _id, createdAt, updatedAt, _doc: { ...songInfo } } } } = searchSong;
  // delete songInfo._id;
  // delete songInfo.createdAt;
  // delete songInfo.updatedAt;

  const enhancedSpotifyInfo = {
    // ...songInfo,
    spotify: spotifyInfo?.data?.[0] || null
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
