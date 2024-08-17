import { useLazyQuery } from "@apollo/client";
import { useCtx } from "@/components/Context";
import {
  SET_SONG_QUERY,
  SET_ARTIST_QUERY,
  SET_GENRE_QUERY,
  SET_QUOTES_QUERY,
  SET_SEARCH_RESULTS
} from "@/components/Context/actions";
import { SEARCH_MUSIC_QUERY } from "@/graphql/queries/searchMusic";
import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { shuffleArr } from "@/utils/shuffle";
import { debounce } from "@/utils/debounce";
import { FormEvent, useMemo, useEffect } from "react";
import './search.css';
import { useNavigate } from "react-router";
import { createSongUrl } from "@/utils/createSongUrl";

export const dynamic = "force-dynamic";

const SearchPage = () => {
  const [state, dispatch] = useCtx() as any;
  const [searchMusic, { loading, error }] = useLazyQuery(SEARCH_MUSIC_QUERY);
  const navigate = useNavigate();

  const searchResults = useMemo(() => state?.searchResults?.slice(0, 20), [state?.searchResults]);
  /**
   * Memoizes the debounced function to avoid unnecessary re-renders and ensure
   * consistent debounce behavior.
   *
   * The `debounce` function creates a debounced version of the async search function,
   * preventing it from being called too frequently by ensuring that it waits for the
   * specified delay (1000ms) between calls. The debounced function maintains a single
   * `timeoutId` across calls due to closure, enabling proper debounce logic. This
   * closure happens because we save the returned function in a variable.
   *
   * `useMemo` is used to memoize the debounced function, ensuring that the same instance
   * of the debounced function is used across renders unless the dependencies change.
   * This prevents the creation of a new debounced function on each render, preserving
   * the internal state (like `timeoutId`) and ensuring efficient performance.
   *
   * The dependencies array `[searchMusic, dispatch]` ensures that the debounced function
   * is only recreated if either `searchMusic` or `dispatch` changes, further optimizing
   * performance and avoiding unnecessary re-renders.
   */
  const debouncedSearchMusic = useMemo(() =>
      debounce(async (variables) => {
        const { data } = await searchMusic({ variables });
        dispatch({
          type: SET_SEARCH_RESULTS,
          payload: shuffleArr(data?.searchMusic)
        });
      }, 1000),
    [searchMusic, dispatch]
  );

  const handleInputChange = async (type: string, value: string) => {
    dispatch({ type, payload: value });
    debouncedSearchMusic({
      songQuery: type === SET_SONG_QUERY ? value : state.songQuery,
      artistQuery: type === SET_ARTIST_QUERY ? value : state.artistQuery,
      albumQuery: state.albumQuery,
      genreQuery: type === SET_GENRE_QUERY ? value : state.genreQuery,
      tagsQuery: state.tagsQuery,
      quotesQuery: type === SET_QUOTES_QUERY ? value : state.quotesQuery
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await searchMusic({
      variables: {
        songQuery: state.songQuery,
        artistQuery: state.artistQuery
      }
    });

    dispatch({
      type: SET_SEARCH_RESULTS,
      payload: shuffleArr(data?.searchMusic)
    });
  };

  return (
    <>
      <div className="song-container">
        <h1 className="song-heading">Search for your music!</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 sm:gap-4">
              <Input
                type="SongSearch"
                label="Song Search"
                value={state.songQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_SONG_QUERY, value)}
              />
              <Input
                type="ArtistSearch"
                label="Artist Search"
                value={state.artistQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_ARTIST_QUERY, value)}
              />
              <Input
                type="GenreQuery"
                label="Genre Search"
                value={state.genreQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_GENRE_QUERY, value)}
              />
              <Input
                type="QuotesSearch"
                label="Quotes Search"
                value={state.quotesQuery}
                onChange={({ target: { value } }) => handleInputChange(SET_QUOTES_QUERY, value)}
              />
            </div>
            <br/>
            <Button
              type="submit"
              color="primary"
              variant="flat"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="song-listBoxContainer">
          <Listbox
            aria-label="Actions"
            onAction={(key) => navigate(key as string)}
          >
            {searchResults?.map((result) => (
              <ListboxItem key={createSongUrl(result.song)}>
                {result.song}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
