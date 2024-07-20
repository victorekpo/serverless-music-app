import { Button, Input } from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
// import { useCtx } from "@/components/Context";
// import { useMutation } from "@apollo/client";
// import { UPDATE_SONG } from "@/components/Context/actions";
// import { UPDATE_MUSIC_QUERY } from "@/graphql/queries/updateMusic";
// import toast from "react-hot-toast";
import './song.css';
import type { SongInfo } from "@/@types/Music";
import { useCtx } from "@/components/Context";

const SongPage = () => {

  const context = useCtx() as any;
  // console.log(context)
  // const { user } = state;
  const [edit, setEdit] = useState(false);
  const [formState, setFormState] = useState({}) as any;
  // const { music } = state;
  const music = { songs: [
    {
      song: '123',
      songInfo: { artist: 'vic', song: 'song'}
    }
  ]}
  const songTrack = "123"
  // const songTrack = useMemo(() => (
  //   params.song
  //     .replace("--", " -- ")
  //     .replaceAll("_", " ")
  //     .replaceAll("%2C", ",")
  //     .replaceAll("%3A", ":")
  //     .replaceAll("%3B", ";")
  // ), [params.song]);

  const found = useMemo(() => {
    const ignoredKeys = ['__typename'];
    const f = music?.songs.find((s: SongInfo | any) => s.song === songTrack)
    if (f) {
      const s = { ...f, songInfo: { ...f.songInfo } };
      // ignoredKeys.forEach(k => {
      //   delete s.songInfo[k];
      // });
      return s;
    }
  }, [music, songTrack]);

  // const found = { song: '', songInfo: {}}

  const [song, setSong] = useState(found);
  //
  useEffect(() => {
    if (found && !song) {
      setSong(found);
    }
  }, [song, found]);
  //
  useEffect(() => {
    if (song?.songInfo) {
      setFormState(song.songInfo);
    }
    console.log("Song", song, context)
  }, [song]);

  // const [updateSong, { error }] = useMutation(UPDATE_MUSIC_QUERY);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Mutation query to update song in db
    // await updateSong({
    //   variables: {
    //     user,
    //     oldSongId: song._id,
    //     song: { ...formState }
    //   }
    // });
    //
    // if (!error) {
    //   toast.success("Song updated successfully");
    //   // Dispatch to update global state music object
    //   dispatch({
    //     type: UPDATE_SONG,
    //     payload: { songId: song._id, ...formState }
    //   });
    //   // Set new song to local state for current page
    //   setSong({
    //     _id: song._id,
    //     song: `${formState.artist} -- ${formState.song}`,
    //     songInfo: { ...formState }
    //   });
    //   // Delete local storage to force a refresh
    //   localStorage.removeItem('musicData');
    // } else {
    //   toast.error("Error updating song");
    // }
  };

  return (
    <>
      <h1 className='song-songHeading'>
        {song?.song}
      </h1>
      <br/>
      {/*<form*/}
      {/*  className={"song-formContainer" + " " + (edit ? "song-editable" + " flex w-full flex-wrap md:flex-nowrap gap-2 sm:gap-4" : "")}*/}
      {/*  onSubmit={handleSubmit}*/}
      {/*>*/}
      {/*  {Object.entries(song?.songInfo || {}).map(([k, v], i) => (*/}
      {/*    <div key={i}>*/}
      {/*      {edit ? (*/}
      {/*        <>*/}
      {/*          <Input*/}
      {/*            type={k}*/}
      {/*            label={k}*/}
      {/*            value={formState[k]}*/}
      {/*            onChange={({ target: { value } }) => {*/}
      {/*              setFormState((prev: any) => ({*/}
      {/*                ...prev,*/}
      {/*                [k]: value*/}
      {/*              }));*/}
      {/*            }}*/}
      {/*          />*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <>*/}
      {/*          <span className="song-fields">{k}:</span> {v} <br/>*/}
      {/*        </>*/}
      {/*      )*/}
      {/*      }*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*  {edit ? (*/}
      {/*    <div style={{ width: "100%" }}>*/}
      {/*      <div className="song-buttonContainer">*/}
      {/*        <Button*/}
      {/*          color="primary"*/}
      {/*          onClick={(e) => {*/}
      {/*            setEdit(!edit)*/}
      {/*            handleSubmit(e)*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          Submit*/}
      {/*        </Button>*/}
      {/*        <Button*/}
      {/*          variant="bordered"*/}
      {/*          color="danger"*/}
      {/*          onClick={() => {*/}
      {/*            setEdit(!edit)*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          Delete Song*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <Button*/}
      {/*      color="primary"*/}
      {/*      variant="bordered"*/}
      {/*      onClick={() => {*/}
      {/*        setEdit(!edit)*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      Edit Song*/}
      {/*    </Button>*/}
      {/*  )}*/}
      {/*</form>*/}
    </>
  )
}

export default SongPage;
