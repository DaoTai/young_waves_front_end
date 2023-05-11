import { Avatar, useTheme } from "@mui/material";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageInput, OverlayFullImage } from "../../../../../components";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { WrapAvatar } from "../styles";

interface Props {
   user: Profile;
   variant?: "rounded" | "square" | "circular";
   borderRadius?: number | string;
}

const AvatarProfile = ({ user, variant = "circular", borderRadius }: Props) => {
   const dispatch = useDispatch();
   const auth$ = useSelector(authState$);
   const [open, setOpen] = useState<boolean>(false);
   const imageRef = useRef(Object(null));
   const onChange = (file: string) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ avatar: file, _id: user._id }));
   };

   // Open full image
   const onOpen = () => {
      user?.avatar && setOpen(true);
   };

   // Close full image
   const onClose = () => {
      setOpen(false);
   };
   return (
      <>
         <WrapAvatar>
            <Avatar
               variant={variant}
               src={user?.avatar}
               sx={{
                  width: 220,
                  height: 220,
                  border: 0.5,
                  borderRadius,
               }}
               onClick={onOpen}
            />
            {auth$.payload.user._id === user?._id && <ImageInput onChange={onChange} />}
         </WrapAvatar>
         <OverlayFullImage open={open} src={user?.avatar} onClose={onClose} />
      </>
   );
};

export default AvatarProfile;
