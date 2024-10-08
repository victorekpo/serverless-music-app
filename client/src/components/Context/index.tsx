import { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import { reducer } from './reducers';
import { useQuery } from "@apollo/client";
import { GET_ALL_MUSIC_QUERY } from "@/graphql/queries/getMusic";
import { SET_ALL_MUSIC, SET_MUSIC_LOADING } from "@/components/Context/actions";
import { DEFAULT_USER, MUSIC_LOCAL_STORAGE_KEY } from "@/constants";

const AppContext = createContext({});

export const useCtx = () => useContext(AppContext);

const user = DEFAULT_USER;

const initialState = {
  user,
  songQuery: '',
  artistQuery: '',
  albumQuery: '',
  genreQuery: '',
  quotesQuery: '',
  tagsQuery: '',
  searchResults: [],
  music: undefined,
  musicLoading: 'loading'
};

export const AppContextProvider = ({ children }: any) => {
  // const cached = localStorage.getItem(MUSIC_LOCAL_STORAGE_KEY);

  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const { data: musicData, loading: isLoading } = useQuery(GET_ALL_MUSIC_QUERY, {
    variables: { user },
    // no benefit to using cache right now
    // skip: !!cached && !!state.music, // Skip query if cached data is available and state has music
    fetchPolicy: 'network-only' // Always fetch from the network, ignoring the cache
  });
  // useEffect(() => {
  //   if (cached && !state.music) {
  //     console.log("Using Cached Music")
  //     dispatch({
  //       type: SET_ALL_MUSIC,
  //       payload: JSON.parse(cached).getAllMusic
  //     });
  //   }
  // }, [cached]);

  useEffect(() => {
    dispatch({
      type: SET_MUSIC_LOADING,
      payload: isLoading
    })
  }, [isLoading])

  useEffect(() => {
    if (musicData) {
      dispatch({
        type: SET_ALL_MUSIC,
        payload: musicData.getAllMusic
      });
      // console.log("Setting music data to cache");
      // localStorage.setItem(MUSIC_LOCAL_STORAGE_KEY, JSON.stringify(musicData));
    }
  }, [musicData]);

  const providerValue = useMemo(() => [state, dispatch], [state]);

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
