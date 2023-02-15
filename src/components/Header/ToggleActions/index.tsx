import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SecurityIcon from "@mui/icons-material/Security";
import { Box, ToggleButton, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../redux-saga/redux/actions";
import { signInState$, signOutState$ } from "../../../redux-saga/redux/selectors";
import { SIGN_OUT_SUCCESS } from "../../../utils/constants";

import Spinner from "../../Spinner";
import { Option, OptionButton, ToggleOptions } from "../styles";
import { Anchor } from "./types";
const ToggleActions = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { payload } = useSelector(signInState$);
   const signOut$ = useSelector(signOutState$);
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

   useEffect(() => {
      if (signOut$.action === SIGN_OUT_SUCCESS) {
         window.location.replace("/auth/sign-in");
      }
   }, [signOut$.action]);

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
         <Spinner show={signOut$.isLoading} />
         {/* When log out success */}
         {/* {signOut$.action === SIGN_OUT_SUCCESS && <Navigate to="/auth/sign-in" />} */}
      </>
   );
};

export default ToggleActions;
