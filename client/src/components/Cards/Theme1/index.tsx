import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { createSongUrl } from "@/utils/createSongUrl";
import { useNavigate } from "react-router";
import "./genre.css"

export const Theme1Card = ({ item }) => {
  const navigate = useNavigate();
  const song = item?.songs?.[0]
  return (
    <div
      onClick={() => {
        navigate(createSongUrl(song?.song))
      }}
      style={{ cursor: "pointer" }}
    >
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{item?.genre}</p>
          <small className="text-default-500">{item?.count} Tracks</small>
          <h4 className="genre-title font-bold text-large">{song?.songInfo?.artist}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={song?.songInfo?.spotify?.album?.image}
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  );
}
