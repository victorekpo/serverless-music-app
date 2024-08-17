import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export const Theme2Card = ({ item }) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <Image
        alt={item?.songs?.[0]?.songInfo?.quotes}
        className="object-cover"
        height={200}
        src={item?.songs?.[0]?.songInfo?.spotify?.album?.image}
        width={200}
      />
      <CardFooter
        className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p
          className="text-tiny text-white/80">{item?.songs?.[0]?.songInfo?.artist || 'Artist'} - {item?.songs?.[0]?.songInfo?.song || 'Song'}</p>
      </CardFooter>
    </Card>
  );
}
