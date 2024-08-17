import { Button, Input, Listbox, ListboxItem } from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCtx } from "@/components/Context";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SET_SEARCH_RESULTS, UPDATE_SONG } from "@/components/Context/actions";
import { UPDATE_MUSIC_QUERY } from "@/graphql/queries/updateMusic";
import toast from "react-hot-toast";
import { Song } from "@/@types/Music";
import './song.css';
import { Twitter } from "@/components/Cards/Twitter";
import { debounce } from "@/utils/debounce";
import { SEARCH_SPOTIFY_QUERY } from "@/graphql/queries/searchSpotify";
import { Helmet } from 'react-helmet';

const DEFAULT_IMAGE_URL = "https://i.etsystatic.com/22225911/r/il/9af2e1/4874151059/il_570xN.4874151059_h5kc.jpg"

const SongPage = () => {
  const { songId } = useParams();

  const [state, dispatch] = useCtx() as any;
  const { user, music } = state;
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({}) as any;
  const [spotifyResults, setSpotifyResults] = useState(null) as any;
  const [searchSpotify, { loading, error: spotifyError }] = useLazyQuery(SEARCH_SPOTIFY_QUERY);
  const [updateSong, { error }] = useMutation(UPDATE_MUSIC_QUERY);
  const debouncedSpotifySearch = useMemo(() =>
      debounce(async (value) => {
        console.log("Spotify searching for ...", value)
        const { data } = await searchSpotify({ variables: { spotifyQuery: value } });
        console.log("Data from spotify", data);
        setSpotifyResults(data.searchSpotify);
      }, 1000),
    [searchSpotify, dispatch]
  );

  const handleSpotifySearch = (value) => {
    debouncedSpotifySearch(value)
  }

  const handleUpdateSpotifyInfo = async (spotifyInfoString) => {
    const parsedSpotifyInfo = JSON.parse(spotifyInfoString);
    const spotify = {
      duration: parsedSpotifyInfo.duration,
      link: parsedSpotifyInfo.link,
      song: parsedSpotifyInfo.song,
      popularity: parsedSpotifyInfo.popularity,
      album: {
        image: parsedSpotifyInfo.album.image,
        name: parsedSpotifyInfo.album.name,
        released: parsedSpotifyInfo.album.released,
        totalTracks: parsedSpotifyInfo.album.totalTracks
      }
    }
    // Mutation query to update song in db
    await updateSong({
      variables: {
        user,
        oldSongId: song._id,
        song: { spotify }
      }
    });

    if (!error) {
      toast.success("Song updated successfully with new Spotify Info");
      // Dispatch to update global state music object
      dispatch({
        type: UPDATE_SONG,
        payload: { songId: song._id, ...formState, spotify }
      });
      // Set new song to local state for current page
      setSong({
        _id: song._id,
        song: `${formState.artist} -- ${formState.song}`,
        songInfo: { ...formState, spotify }
      });
      setEdit(false)
    } else {
      toast.error("Error updating song with new Spotify Info");
    }
  }

  // Type-check and handle undefined songId
  const validSongId = typeof songId === 'string' ? songId : '';

  const songTrack = useMemo(() => (
    validSongId
      .replace("--", " -- ")
      .replaceAll("_", " ")
      .replaceAll("%2C", ",")
      .replaceAll("%3A", ":")
      .replaceAll("%3B", ";")
  ), [songId]);

  const found = useMemo(() => {
    const ignoredKeys = ['__typename'];
    const f = music?.songs.find((s: Song) => s.song.toLowerCase() === songTrack.toLowerCase())

    if (f) {
      const s = { ...f, songInfo: { ...f.songInfo } };
      ignoredKeys.forEach(k => {
        delete s.songInfo[k];
      });
      return s;
    }
    console.log("SongId", songId, songTrack);
  }, [music, songTrack]);

  const [song, setSong] = useState(found);

  useEffect(() => {
    if (found && !song) {
      setSong(found);
      console.log("SONG", song)
    }
  }, [song, found]);

  useEffect(() => {
    if (song?.songInfo) {
      const songInfoWithoutSpotify = { ...song.songInfo };
      delete songInfoWithoutSpotify.spotify;
      setFormState(songInfoWithoutSpotify);
    }
  }, [song]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Mutation query to update song in db
    await updateSong({
      variables: {
        user,
        oldSongId: song._id,
        song: { ...formState }
      }
    });

    if (!error) {
      toast.success("Song updated successfully");
      // Dispatch to update global state music object
      dispatch({
        type: UPDATE_SONG,
        payload: { songId: song._id, ...song.songInfo, ...formState }
      });
      // Set new song to local state for current page
      setSong({
        _id: song._id,
        song: `${formState.artist} -- ${formState.song}`,
        songInfo: { ...song.songInfo, ...formState }
      });
      // // Delete local storage to force a refresh
      // localStorage.removeItem('musicData');
    } else {
      toast.error("Error updating song");
    }
  };


  return (
    <>
      <div>
        <Helmet>
          <meta property="og:title" content={song?.song}/>
          <meta property="og:description" content={song?.songInfo?.quotes}/>
          <meta property="og:image" content={song?.songInfo?.spotify?.album?.image || DEFAULT_IMAGE_URL}/>
        </Helmet>
      </div>
      <h1 className='song-songHeading'>
        {song?.song}
      </h1>
      {song?.songInfo?.spotify && (
        <div>
          <img style={{ height: "350px" }} src={song.songInfo.spotify.album.image} alt=""/>
          <a href={song.songInfo.spotify.link}>Play on Spotify
            <img
              src="https://developer.spotify.com/images/guidelines/design/icon3@2x.png" alt="Play on Spotify"
              style={{ height: "75px" }}/>
          </a>
        </div>
      )}
      <br/>
      <form
        className={"song-formContainer" + " " + (edit ? "song-editable" + " flex w-full flex-wrap md:flex-wrap gap-2 sm:gap-4" : "")}
        onSubmit={handleSubmit}
      >
        {Object.entries(song?.songInfo || {}).map(([k, v]: any, i) => {
            return (
              <div key={i}>
                {(edit && k !== 'spotify') ? (
                  <>
                    <Input
                      type={k}
                      label={k}
                      value={formState[k]}
                      onChange={({ target: { value } }) => {
                        setFormState((prev: any) => ({
                          ...prev,
                          [k]: value
                        }));
                      }}
                    />
                  </>
                ) : (
                  k !== 'spotify' ? (
                    <>
                      <span className="song-fields">{k}:</span> {typeof (v) === 'object' ? JSON.stringify(v) : v} <br/>
                    </>
                  ) : (
                    <>
                      {!!v ? (
                        <>
                          <span className="song-fields">duration: </span>
                          <span>{v.duration}</span>
                          <br/>
                          <span className="song-fields">released: </span>
                          <span>{v.album.released}</span>
                          <br/>
                        </>
                      ) : ''}
                    </>
                  )
                )
                }
              </div>
            )
          }
        )}
        {

        }
        {edit ? (
          <div style={{ width: "100%" }}>
            <div className="song-buttonContainer">
              <Button
                color="primary"
                onClick={(e) => {
                  setEdit(!edit)
                  handleSubmit(e)
                }}
              >
                Submit
              </Button>
              <Button
                variant="bordered"
                color="danger"
                onClick={() => {
                  setEdit(!edit)
                }}
              >
                Delete Song
              </Button>
            </div>
          </div>
        ) : (
          <Button
            color="primary"
            variant="bordered"
            onClick={() => {
              setEdit(!edit)
            }}
          >
            Edit Song
          </Button>
        )}
      </form>
      {edit && (
        <div style={{ width: "400px" }}>
          <hr/>
          <span>Search for Spotify Info</span>
          <Input
            type="SpotifySearch"
            label="Spotify Search"
            onChange={({ target: { value } }) => handleSpotifySearch(value)}
          />
          <Listbox
            aria-label="Actions"
            onAction={(info) => handleUpdateSpotifyInfo(info)}
          >
            {spotifyResults?.map((result, i) => (
              <ListboxItem key={JSON.stringify(result)}>
                <span style={{ whiteSpace: "break-spaces" }}>
                  <div style={{ display: "flex", gap: 20, justifyContent: "space-between" }}>
                    <div>
                      {result.artist.join(", ")} <br/>
                      {result.song} <br/>
                      Album: {result.album.name}
                    </div>
                    <div>
                      <img src={result.album.image} style={{ height: "75px" }}/>
                    </div>
                  </div>
                </span>
              </ListboxItem>
            ))}
          </Listbox>
        </div>)}
      <hr/>
      {/*<Twitter/>*/}
    </>
  )
}

export default SongPage;
