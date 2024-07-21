import { Theme1Card } from "@/components/Cards/Theme1";

const top4Genres = [1, 2, 3, 4];

const DashboardPage = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <br/>
      <div className=''
           style={{
             display: "flex",
             gap: "80px 0",
             alignItems: "center",
             justifyContent: "space-evenly",
             flexWrap: "wrap"
           }}>
        {top4Genres.map(k => (
          <div style={{ flex: "0 0 300px" }}>
            <Theme1Card/>
          </div>
        ))}
      </div>

    </>
  )
}

export default DashboardPage