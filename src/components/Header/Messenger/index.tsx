import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import {
   AppBar,
   Button,
   Popper,
   Grid,
   Toolbar,
   useTheme,
   Popover,
   Badge,
   Tooltip,
} from "@mui/material";
import { useState } from "react";

import { ListChat } from "../../../pages/user/Chat";

const Messenger = () => {
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
         <Tooltip title="Messenger" arrow>
            <Badge
               badgeContent={4}
               color="info"
               sx={{
                  cursor: "pointer",
                  color: "hotpink",
                  backgroundColor: "primary",
                  "&:hover": {
                     backgroundColor: "primary",
                  },
               }}
               onClick={handleShowListChat}>
               <ForwardToInboxIcon fontSize="large" />
            </Badge>
         </Tooltip>
         <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseListChat}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}>
            <ListChat onClose={handleCloseListChat} />
         </Popover>
      </>
   );
};

export default Messenger;
