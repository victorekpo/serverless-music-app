import { Badge, Avatar } from "@nextui-org/react";

export const ProfileBadge = () => {
  return (
    <div className="flex gap-4 items-center">
      <Badge content="5" color="danger" shape="circle">
        <Avatar
          isBordered
          radius="full"
          src="https://lh3.googleusercontent.com/a/ACg8ocJ0FVfCCUUy9FkXebellLeN2W49yjrA5zSMkn0VOYWrCqpPQwYnHw=s288-c-no"
        />
      </Badge>
    </div>
  );
}
