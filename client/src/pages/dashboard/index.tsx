import { Theme1Card } from "@/components/Cards/Theme1";
import { Theme2Card } from "@/components/Cards/Theme2";

const top4Genres = new Array(4).fill(null);

const top20Songs = new Array(20).fill(null);

const DashboardPage = () => {
  return (
    <>
      <h4 style={{ textAlign: "center", marginTop: 20, fontSize: 14 }}>Good day! Browse the most popular genres and
        songs.</h4>
      <br/>
      <div className='db-top-4-genres'
           style={{
             display: "flex",
             gap: "80px 0",
             alignItems: "center",
             justifyContent: "space-evenly",
             flexWrap: "wrap",
             marginBottom: 50
           }}>
        {top4Genres.map(k => (
          <div style={{ flex: "0 0 300px" }}>
            <Theme1Card/>
          </div>
        ))}
      </div>

      <hr style={{ borderColor: "#162033" }}/>

      <div className='db-top-20-songs'
           style={{
             display: "flex",
             gap: "40px 40px",
             alignItems: "center",
             justifyContent: "space-evenly",
             flexWrap: "wrap",
             marginTop: 50,
             marginBottom: 50
           }}>
        {top20Songs.map(k => (
          <div style={{ flex: "0 0 150px" }}>
            <Theme2Card/>
          </div>
        ))}
      </div>

      <hr style={{ borderColor: "#162033" }}/>

    </>
  )
}

export default DashboardPage