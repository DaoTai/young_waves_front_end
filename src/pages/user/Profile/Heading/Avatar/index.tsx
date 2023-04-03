import { Avatar, useTheme } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageInput } from "../../../../../components";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { WrapAvatar } from "../styles";

const AvatarProfile = ({
   user,
   variant = "circular",
   borderRadius,
}: {
   user: Profile;
   variant?: "rounded" | "square" | "circular";
   borderRadius?: number | string;
}) => {
   const dispatch = useDispatch();
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const imageRef = useRef(Object(null));
   const onChange = (file) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ avatar: file, _id: user._id }));
   };
   return (
      <WrapAvatar>
         <Avatar
            variant={variant}
            src={user?.avatar}
            sx={{
               width: 200,
               height: 200,
               border: 0.5,
               borderRadius,
            }}></Avatar>
         {auth$.payload.user._id === user?._id && <ImageInput onChange={onChange} />}
      </WrapAvatar>
   );
};

export default AvatarProfile;
