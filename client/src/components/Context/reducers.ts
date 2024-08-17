import {
  SET_ALL_MUSIC,
  SET_SONG_QUERY,
  SET_ARTIST_QUERY,
  SET_ALBUM_QUERY,
  SET_GENRE_QUERY,
  SET_TAGS_QUERY,
  SET_QUOTES_QUERY,
  SET_SEARCH_RESULTS,
  UPDATE_SONG,
  SET_MUSIC_LOADING
} from "@/components/Context/actions";
// import { Song } from "@/@types/Music";

export const reducer = (state: Record<string, any>, action: { type: string, payload: any }) => {
  switch (action.type) {
    case SET_MUSIC_LOADING:
      console.log("Setting music is loading", action.payload)
      return {
        ...state,
        musicLoading: action.payload
      };
    case SET_ALL_MUSIC:
      return {
        ...state,
        music: action.payload
      }
    case SET_SONG_QUERY:
      return {
        ...state,
        songQuery: action.payload
      };

    case SET_ARTIST_QUERY:
      return {
        ...state,
        artistQuery: action.payload
      };

    case SET_ALBUM_QUERY:
      return {
        ...state,
        albumQuery: action.payload
      };

    case SET_GENRE_QUERY:
      return {
        ...state,
        genreQuery: action.payload
      };

    case SET_TAGS_QUERY:
      return {
        ...state,
        tagsQuery: action.payload
      };

    case SET_QUOTES_QUERY:
      return {
        ...state,
        quotesQuery: action.payload
      };

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };

    case UPDATE_SONG:
      const { songId, ...songPayload } = action.payload;
      const newSongTrack = `${songPayload.artist} -- ${songPayload.song}`;
      const arrayWithoutSong = state.music.songs.filter((song: any) => song._id !== songId);
      const newSong = {
        _id: songId,
        song: newSongTrack,
        songInfo: { ...songPayload }
      };

      return {
        ...state,
        music: {
          ...state.music,
          songs: [
            ...arrayWithoutSong,
            newSong
          ]
        }
      };

    default:
      return state;
  }
}