import { Badge, Avatar } from "@nextui-org/react";

export const ProfileBadge = () => {
  return (
    <div className="flex gap-4 items-center">
      <Badge content="5" color="danger" shape="circle">
        <Avatar
          isBordered
          radius="full"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </Badge>
    </div>
  );
}
