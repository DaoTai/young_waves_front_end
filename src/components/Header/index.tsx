import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { AppBar, Button, Popper, Grid, Toolbar, useTheme, Popover, Badge } from "@mui/material";
import { useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./ToggleActions";
import { ListChat } from "../../pages/user/Chat";
const Header = () => {
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
      <AppBar position="fixed" sx={{ bgcolor: theme.myColor.white, boxShadow: 1 }}>
         <Toolbar>
            <Grid
               container
               justifyContent="space-between"
               gap={4}
               alignItems="center"
               flexWrap="nowrap">
               <Grid item>
                  <Logo />
               </Grid>
               {/* Navigation */}
               <Grid item mr="auto">
                  <Navigation />
               </Grid>

               {/* Messenger */}
               <Grid item>
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
                  <Popover
                     open={open}
                     anchorEl={anchorEl}
                     onClose={handleCloseListChat}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                     }}>
                     <ListChat />
                  </Popover>
               </Grid>

               {/* Switch button change theme */}
               <Grid item>{/* <SwitchTheme /> */}</Grid>

               {/* Toggle */}
               <Grid item>
                  <Actions />
               </Grid>
            </Grid>
         </Toolbar>
      </AppBar>
   );
};

export default Header;
