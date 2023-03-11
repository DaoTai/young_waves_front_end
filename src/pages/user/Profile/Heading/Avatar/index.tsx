import { Avatar } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageInput, Spinner } from "../../../../../components";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { profileState$ } from "../../../../../redux-saga/redux/selectors";
import { WrapAvatar } from "../styles";

const MyAvatar = ({ image, ...props }: { image?: string; props?: any }) => {
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(profileState$);
   const imageRef = useRef(Object(null));
   const handleChange = (file) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ avatar: file, _id: Object(payload?.data)._id }));
   };
   return (
      <>
         <WrapAvatar>
            <Avatar ref={imageRef} src={image} alt="avatar" sx={{ width: 220, height: 220 }} />
            <ImageInput onChange={handleChange} />
         </WrapAvatar>
         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default MyAvatar;
