import { USERS } from "@/db/dummy";

import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, X } from "lucide-react";
import { useSelectedUser } from "@/store/useSelectedUser";

function ChatTopbar() {
 const  {selectedUser, setSelectedUser}  = useSelectedUser();
  return (
    <div className="w-full h-20 p-4 flex justify-between items-center border-b">
      <div className=" flex items-center gap-2">
        <Avatar className=" flex items-center justify-center">
          <AvatarImage
            src={selectedUser?.image || "/user-placeholder.png"}
            alt="user image"
            className="w-10 h-10 object-cover rounded-full"
          />
        </Avatar>

        <span className=" font-medium">{selectedUser?.name}</span>
      </div>

      <div className="flex gap-2">
        <Info
          
          className="text-muted-foreground cursor-pointer hover:text-primary"
        />
        <X  className="text-muted-foreground cursor-pointer hover:text-primary "
        onClick={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
}

export default ChatTopbar;
