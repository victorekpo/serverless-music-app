import { useEffect, useState } from "react";
import { Theme1Card } from "@/components/Cards/Theme1";
import { Theme2Card } from "@/components/Cards/Theme2";
import './dashboard.css';
import { getTopLists } from "@/utils/topLists";
import { useCtx } from "@/components/Context";

const DashboardPage = () => {
  const [top4Genres, setTop4] = useState(new Array(4).fill(null) as any)
  const [top20Songs, setTop20] = useState(new Array(20).fill(null) as any)
  const [state] = useCtx() as any;
  const { music } = state;

  useEffect(() => {
    (async () => {
      const { top4Genres, top20Songs } = getTopLists(music);
      console.log("TOP 4 GENRES", top4Genres)
      console.log("TOP 20 SONGS", top20Songs)
      top4Genres.length && setTop4(top4Genres);
      top20Songs.length && setTop20(top20Songs);
    })()

  }, [music])

  return (
    <>
      <h4 className="db-h4">
        Good day! Browse the most popular genres and songs.
      </h4>
      <br/>
      <div className='db-top-4-genres'>
        {top4Genres.map((item, i) => (
          <section key={i * 100}>
            <Theme1Card
              item={item}
            />
          </section>
        ))}
      </div>

      <hr/>

      <div className='db-top-20-songs'>
        {top20Songs.map((item, i) => (
          <section key={i}>
            <Theme2Card
              item={item}
            />
          </section>
        ))}
      </div>

      <hr/>
    </>
  )
}

export default DashboardPage