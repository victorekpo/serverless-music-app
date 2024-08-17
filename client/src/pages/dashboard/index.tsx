import { useEffect, useState } from "react";
import { Theme1Card } from "@/components/Cards/Theme1";
import { Theme2Card } from "@/components/Cards/Theme2";
import './dashboard.css';
import { getTopLists } from "@/utils/topLists";
import { useCtx } from "@/components/Context";
import { MAX_GENRES, MAX_SONGS } from "@/constants";

const DashboardPage = () => {
  const [songs, setSongs] = useState(new Array(MAX_SONGS).fill(null) as any)
  const [state] = useCtx() as any;
  const { music } = state;

  useEffect(() => {
    (async () => {
      const { topSongs } = getTopLists(music);
      console.log("TOP SONGS", topSongs)
      topSongs.length && setSongs(topSongs);
    })()

  }, [music])

  return (
    <>
      <h4 className="db-h4">
        Good day! Browse the most popular genres and songs.
      </h4>
      <br/>
      <div className='db-top-genres'>
        {songs.slice(0, MAX_GENRES).map((item, i) => (
          <section key={i * 100}>
            <Theme1Card
              item={item}
            />
          </section>
        ))}
      </div>


      {[...songs].reverse().map((item, i) => (
        <div style={{ textAlign: "center" }} key={i}>
          <hr/>
          <span>
            {item?.genre}
          </span>
          <div className='db-top-songs'>
            {item?.songs?.map((song, j) => (
              <section>
                <Theme2Card
                  item={song}
                />
              </section>
            ))}

          </div>
        </div>
      ))}

      <hr/>
    </>
  )
}

export default DashboardPage