import { createContext, useContext, useEffect, useReducer, useMemo } from "react";
import { reducer } from './reducers';
import { useQuery } from "@apollo/client";
import { GET_ALL_MUSIC_QUERY } from "@/graphql/queries/getMusic";
import { SET_ALL_MUSIC } from "@/components/Context/actions";

const AppContext = createContext({});

export const useCtx = () => useContext(AppContext);

const user = '667ced56d3ac2d92c0fa5326';

const initialState = {
  user,
  songQuery: '',
  artistQuery: '',
  albumQuery: '',
  genreQuery: '',
  quotesQuery: '',
  tagsQuery: '',
  searchResults: [],
  music: undefined
};

export const AppContextProvider = ({ children }: any) => {
  const cached = localStorage.getItem("musicData");

  const { data: musicData } = useQuery(GET_ALL_MUSIC_QUERY, {
    variables: { user },
    skip: !!cached // Skip query if cached data is available
  });

  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    if (cached) {
      console.log("Using Cached Music")
      dispatch({
        type: SET_ALL_MUSIC,
        payload: JSON.parse(cached).getAllMusic
      });
    }
  }, [cached]);

  useEffect(() => {
    if (musicData) {
      dispatch({
        type: SET_ALL_MUSIC,
        payload: musicData.getAllMusic
      });
      localStorage.setItem("musicData", JSON.stringify(musicData));
    }
  }, [musicData]);

  useEffect(() => {
    console.log("provider end")
  }, [])
  const providerValue = useMemo(() => [state, dispatch], [state]);

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
