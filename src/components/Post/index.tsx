import { Avatar, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux-saga/redux/actions";
import { authState$, profileState$ } from "../../redux-saga/redux/selectors";
import { INIT_STATE } from "../../utils/constants";
import { Profile } from "../../utils/interfaces/Profile";
import { ModalRef } from "../../utils/interfaces/Props";
import MyInput from "../BaseInput";
import Modal from "./Modal";

const Post = () => {
   const dispatch = useDispatch();
   const user$ = useSelector(profileState$);
   const {
      isLoading,
      payload: { data },
   } = useSelector(authState$);
   const auth = data?.user;
   const [user, setUser] = useState({
      avatar: "",
      fullName: "",
   });
   const modalRef = useRef<ModalRef>(INIT_STATE.modalRef);

   useEffect(() => {
      if (user$.payload.data) {
         setUser(user$.payload.data);
      } else {
         setUser(auth);
      }
   }, [auth, user$]);
   const handleFocus = () => {
      modalRef.current.handleOpen();
   };

   const handleSubmit = () => {
      const { post, images, status } = modalRef.current;
      dispatch(
         createPost({
            body: post.trim(),
            attachments: images,
            status: status.trim(),
         })
      );
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
            <Avatar src={user?.avatar} sx={{ width: 50, height: 50, boxShadow: 1 }} />
         </Grid>
         <Grid item flexGrow={2}>
            <MyInput
               readOnly
               placeholder={`Hi ${user?.fullName}, what do you think?`}
               sx={{ width: "100%", borderRadius: 5 }}
               onClick={handleFocus}
            />
         </Grid>
         <Modal onSubmit={handleSubmit} ref={modalRef} />
      </Grid>
   );
};

export default Post;
