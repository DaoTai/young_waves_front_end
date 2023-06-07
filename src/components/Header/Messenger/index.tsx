import ChatIcon from "@mui/icons-material/Chat";
import { Badge, Popover, Tooltip, useTheme } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Conversations } from "../../../pages/user/Chat";

const Messenger = () => {
   const theme = useTheme();
   const location = useLocation();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleShowListChat = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };
   const handleCloseListChat = () => {
      setAnchorEl(null);
   };
   return (
      <>
         {!location.pathname.includes("/user/chats") && (
            <>
               <Tooltip title="Message">
                  <Badge
                     color="info"
                     sx={{
                        cursor: "pointer",
                        color: theme.palette.primary.main,
                     }}
                     onClick={handleShowListChat}>
                     <ChatIcon fontSize="large" />
                  </Badge>
               </Tooltip>
               <Popover
                  open={open}
                  anchorEl={anchorEl}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  onClose={handleCloseListChat}
                  anchorOrigin={{
                     vertical: "bottom",
                     horizontal: "center",
                  }}
                  sx={{
                     top: 12,
                  }}>
                  <Conversations onClose={handleCloseListChat} />
               </Popover>
            </>
         )}
      </>
   );
};

export default Messenger;
