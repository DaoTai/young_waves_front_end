import { Avatar, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authState$ } from "../../redux-saga/redux/selectors";
import Modal from "./Modal";
const Post = () => {
   const theme = useTheme();
   const [openModal, setOpenModal] = useState(false);
   const auth$ = useSelector(authState$);

   return (
      <Grid
         container
         alignItems="center"
         p={2}
         gap={2}
         bgcolor={theme.myColor.white}
         flexWrap="nowrap"
         boxShadow={1}
         borderRadius={2}>
         <Grid item>
            <Avatar
               src={auth$?.payload?.user.avatar}
               sx={{
                  width: 50,
                  height: 50,
                  boxShadow: 1,
               }}
            />
         </Grid>
         <Grid
            item
            flexGrow={2}
            sx={{
               cursor: "pointer",
               "&:hover": {
                  opacity: 0.8,
               },
            }}
            onClick={() => setOpenModal(true)}>
            <Typography
               variant="subtitle1"
               sx={{ color: theme.myColor.textSecondary, letterSpacing: 1.5 }}>
               Hi {auth$?.payload?.user.fullName}. What's on your mind?
            </Typography>
         </Grid>
         {openModal && <Modal type="create" onClose={() => setOpenModal(false)} />}
      </Grid>
   );
};

export default Post;
