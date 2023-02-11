import { Avatar, Grid, Stack } from "@mui/material";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInState$, profileState$ } from "../../redux-saga/redux/selectors";
import { Profile } from "../../utils/interfaces/Profile";
import { ModalRef } from "../../utils/interfaces/Props";
import { INIT_STATE } from "../../utils/constants";
import MyInput from "../BaseInput";
import { createPost } from "../../redux-saga/redux/actions";
import Image from "../Image";
import Modal from "./Modal";

const Post = () => {
   const dispatch = useDispatch();
   const user$ = useSelector(profileState$);
   const {
      isLoading,
      payload: { data },
   } = useSelector(signInState$);
   const { payload }: { payload: Profile } = data;
   const [user, setUser] = useState({
      avatar: "",
      fullName: "",
   });
   const modalRef = useRef<ModalRef>(INIT_STATE.modalRef);

   useEffect(() => {
      if (user$.payload.data) {
         setUser(user$.payload.data);
      } else {
         setUser(payload);
      }
   }, [payload, user$]);
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
            <Image
               src={user?.avatar}
               style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
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
