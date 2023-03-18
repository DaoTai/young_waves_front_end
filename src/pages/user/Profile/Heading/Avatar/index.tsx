import { Avatar } from "@mui/material";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ImageInput } from "../../../../../components";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { WrapAvatar } from "../styles";

const AvatarProfile = ({ user }: { user: Profile }) => {
   const dispatch = useDispatch();
   const imageRef = useRef(Object(null));
   const onChange = (file) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ avatar: file, _id: user._id }));
   };
   return (
      <WrapAvatar>
         <Avatar src={user?.avatar} sx={{ width: 200, height: 200 }}></Avatar>
         <ImageInput onChange={onChange} />
      </WrapAvatar>
   );
};

export default AvatarProfile;
