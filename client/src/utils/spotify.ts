import { SongInfo } from "@/@types/Music";
import { fetchApi } from "@/fetch";

export const enhanceWithSpotify = async (song: SongInfo) => {
  const { data } = await fetchApi('/spotify');
  console.log("FETCHED SPOTIFY DATA FOR SONG", song.song, data);
  return {
    ...song,
    spotify: data
  }
}