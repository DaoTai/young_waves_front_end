import ChatIcon from "@mui/icons-material/Chat";
import { Badge, Popover, useTheme } from "@mui/material";
import { useState } from "react";

import { Conversations } from "../../../pages/user/Chat";

const Messenger = () => {
   const theme = useTheme();
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
         <Badge
            // badgeContent={4}
            color="info"
            sx={{
               cursor: "pointer",
               color: theme.palette.primary.main,
            }}
            onClick={handleShowListChat}>
            <ChatIcon fontSize="large" />
         </Badge>
         <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseListChat}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}>
            <Conversations onClose={handleCloseListChat} />
         </Popover>
      </>
   );
};

export default Messenger;
