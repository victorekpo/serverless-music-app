import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export const Theme1Card = ({ item }) => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">{item?.count} Tracks</small>
        <h4 className="font-bold text-large">{item?.genre}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={item?.songs?.[0]?.songInfo?.spotify?.album?.image}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
