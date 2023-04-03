import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux-saga/redux/actions";
import { authState$, profileState$ } from "../../redux-saga/redux/selectors";
import { INIT_STATE } from "../../utils/constants";
import { Profile } from "../../utils/interfaces/Profile";
import { ModalRef } from "../../utils/interfaces/Props";
import MyInput from "../BaseInput";
import Modal from "./Modal";
import { Post as IPost } from "../../utils/interfaces/Post";
const Post = () => {
   const dispatch = useDispatch();
   const [openModal, setOpenModal] = useState(false);
   const user$ = useSelector(profileState$);
   const auth$ = useSelector(authState$);

   const handleSubmit = (post: Partial<IPost>) => {
      dispatch(createPost(post));
   };

   return (
      <Grid
         container
         alignItems="center"
         p={2}
         bgcolor={"#fff"}
         boxShadow={1}
         borderRadius={2}
         sx={{ gap: 4 }}>
         <Grid item>
            <Avatar
               src={user$?.payload?.avatar || auth$?.payload?.user.avatar}
               sx={{ width: 50, height: 50, boxShadow: 1 }}
            />
         </Grid>
         <Grid
            item
            flexGrow={2}
            sx={{
               cursor: "text",
            }}
            onClick={() => setOpenModal(true)}>
            <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
               Hi {user$?.payload?.fullName || auth$?.payload?.user.fullName}. What do you think?
            </Typography>
         </Grid>
         <Modal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSubmit} />
      </Grid>
   );
};

export default Post;
