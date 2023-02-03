import { Avatar, Stack } from "@mui/material";
import { useRef } from "react";
import MyInput from "../BaseInput";
import Modal from "./Modal";
interface ModalRef {
   handleOpen: () => void;
   handleClose: () => void;
}
const Post = () => {
   const modalRef = useRef<ModalRef>({
      handleOpen: () => {},
      handleClose: () => {},
   });

   const handleFocus = () => {
      modalRef.current.handleOpen();
   };

   return (
      <Stack
         direction="row"
         alignItems="center"
         p={2}
         bgcolor={"#fff"}
         borderRadius={2}
         sx={{ gap: 4 }}>
         <Avatar alt="Your name" children={"DT"} />
         <MyInput
            readOnly
            placeholder="Hey DT, what do you think?"
            sx={{ width: "100%", borderRadius: 5 }}
            onClick={handleFocus}
         />
         <Modal ref={modalRef} />
      </Stack>
   );
};

export default Post;
