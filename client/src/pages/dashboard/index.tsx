import { Theme1Card } from "@/components/Cards/Theme1";
import { Theme2Card } from "@/components/Cards/Theme2";
import './dashboard.css';
import { Twitter } from "@/components/Cards/Twitter";

const top4Genres = new Array(4).fill(null);
const top20Songs = new Array(20).fill(null);

const DashboardPage = () => {
  return (
    <>
      <h4 className="db-h4">
        Good day! Browse the most popular genres and songs.
      </h4>
      <br/>
      <div className='db-top-4-genres'>
        {top4Genres.map((k, i) => (
          <section>
            <Theme1Card key={i}/>
          </section>
        ))}
      </div>

      <hr/>

      <div className='db-top-20-songs'>
        {top20Songs.map((k, i) => (
          <section>
            <Theme2Card key={i}/>
          </section>
        ))}
      </div>

      <hr/>
    </>
  )
}

export default DashboardPage