import { Avatar, Grid, Stack } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { signInState$ } from "../../redux-saga/redux/selectors";
import { Profile } from "../../utils/interfaces/Profile";
import MyInput from "../BaseInput";
import Image from "../Image";
import Modal from "./Modal";
interface ModalRef {
   handleOpen: () => void;
   handleClose: () => void;
}
const Post = () => {
   const {
      isLoading,
      payload: { data },
   } = useSelector(signInState$);
   const { payload }: { payload: Profile } = data;
   const modalRef = useRef<ModalRef>({
      handleOpen: () => {},
      handleClose: () => {},
   });

   const handleFocus = () => {
      modalRef.current.handleOpen();
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
               src={payload.avatar}
               style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
         </Grid>
         <Grid item flexGrow={2}>
            <MyInput
               readOnly
               placeholder={`Hi ${payload.fullName}, what do you think?`}
               sx={{ width: "100%", borderRadius: 5 }}
               onClick={handleFocus}
            />
         </Grid>
         <Modal idUser={payload._id as string} ref={modalRef} />
      </Grid>
   );
};

export default Post;
