import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Box, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../redux-saga/redux/actions";
import { authState$ } from "../../../redux-saga/redux/selectors";

import Spinner from "../../Spinner";
import { Option, OptionButton, ToggleOptions } from "../styles";
import { Anchor } from "./types";
const ToggleActions = () => {
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(authState$);
   const [show, setShow] = useState(false);
   const toggleDrawer =
      (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
         if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
               (event as React.KeyboardEvent).key === "Shift")
         ) {
            return;
         }
      };

   const handleSignOut = () => {
      dispatch(signOut());
   };

   return (
      <>
         <ToggleButton value="justify" onClick={() => setShow(!show)}>
            <FormatAlignJustifyIcon />
            <ToggleOptions
               anchor="right"
               open={show}
               onClose={toggleDrawer("right", false)}
               onOpen={toggleDrawer("right", true)}>
               {/* List options */}
               <Box>
                  <Option to={`/user/profile/${payload.data.payload._id}`}>
                     <AccountBoxIcon fontSize="medium" />
                     <Typography variant="subtitle1"> Profile</Typography>
                  </Option>

                  <Option to="/user/trash/posts">
                     <RestoreFromTrashIcon fontSize="medium" />
                     <Typography variant="subtitle1"> Trash</Typography>
                  </Option>
               </Box>
               <Box>
                  <OptionButton onClick={handleSignOut}>
                     <LogoutIcon fontSize="medium" />
                     <Typography variant="subtitle1">Log out</Typography>
                  </OptionButton>
               </Box>
            </ToggleOptions>
         </ToggleButton>

         {/* Spinner */}
         <Spinner show={isLoading} />
         {/* When log out success */}
      </>
   );
};

export default ToggleActions;
