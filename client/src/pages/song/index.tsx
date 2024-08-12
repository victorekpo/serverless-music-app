import { Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCtx } from "@/components/Context";
import { useMutation } from "@apollo/client";
import { UPDATE_SONG } from "@/components/Context/actions";
import { UPDATE_MUSIC_QUERY } from "@/graphql/queries/updateMusic";
import toast from "react-hot-toast";
import { Song } from "@/@types/Music";
import './song.css';
import { Twitter } from "@/components/Cards/Twitter";
import { fetchApi } from "@/fetch";

const SongPage = () => {
  const { songId } = useParams();

  const [state, dispatch] = useCtx() as any;
  const { user, music } = state;
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({}) as any;

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
    const f = music?.songs.find((s: Song) => s.song === songTrack)

    if (f) {
      const s = { ...f, songInfo: { ...f.songInfo } };
      ignoredKeys.forEach(k => {
        delete s.songInfo[k];
      });
      return s;
    }
    console.log("SONG ID", songId, songTrack);
  }, [music, songTrack]);

  const [song, setSong] = useState(found);

  useEffect(() => {
    if (found && !song) {
      setSong(found);
    }
  }, [song, found]);

  useEffect(() => {
    if (song?.songInfo) {
      setFormState(song.songInfo);
    }
  }, [song]);

  const [updateSong, { error }] = useMutation(UPDATE_MUSIC_QUERY);

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
        payload: { songId: song._id, ...formState }
      });
      // Set new song to local state for current page
      setSong({
        _id: song._id,
        song: `${formState.artist} -- ${formState.song}`,
        songInfo: { ...formState }
      });
      // Delete local storage to force a refresh
      localStorage.removeItem('musicData');
    } else {
      toast.error("Error updating song");
    }
  };

  return (
    <>
      <h1 className='song-songHeading'>
        {song?.song}
      </h1>
      <br/>
      <form
        className={"song-formContainer" + " " + (edit ? "song-editable" + " flex w-full flex-wrap md:flex-nowrap gap-2 sm:gap-4" : "")}
        onSubmit={handleSubmit}
      >
        {Object.entries(song?.songInfo || {}).map(([k, v], i) => (
          <div key={i}>
            {edit ? (
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
              <>
                <span className="song-fields">{k}:</span> {typeof (v) === 'object' ? JSON.stringify(v) : v} <br/>
              </>
            )
            }
          </div>
        ))}
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
      <hr/>
      <Twitter/>
    </>
  )
}

export default SongPage;
