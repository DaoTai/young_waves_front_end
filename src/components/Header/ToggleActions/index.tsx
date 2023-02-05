import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EditIcon from "@mui/icons-material/Edit";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SecurityIcon from "@mui/icons-material/Security";
import { Box, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signInState$ } from "../../../redux-saga/redux/selectors";

import { Option, ToggleOptions } from "../styles";
import { Anchor } from "./types";
const ToggleActions = () => {
   const { isLoading, payload } = useSelector(signInState$);
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
   return (
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

               <Option to="/user/profile/password">
                  <SecurityIcon fontSize="medium" />
                  <Typography variant="subtitle1"> Edit password</Typography>
               </Option>
               <Option to="/">
                  <RestoreFromTrashIcon fontSize="medium" />
                  <Typography variant="subtitle1"> Trash</Typography>
               </Option>
            </Box>
            <Box>
               <Option to="/auth/sign-in">
                  <LogoutIcon fontSize="medium" />
                  <Typography variant="subtitle1"> Log out</Typography>
               </Option>
            </Box>
         </ToggleOptions>
      </ToggleButton>
   );
};

export default ToggleActions;
