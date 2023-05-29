import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Button, Fab, Stack, Tooltip, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageInput, OverlayFullImage, Dialog } from "../../../../../components";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { WrapAvatar } from "../styles";
import { Attachment } from "../../../../../utils/interfaces/Attachment";

interface Props {
   user: Profile;
   variant?: "rounded" | "square" | "circular";
   borderRadius?: number | string;
}

const AvatarProfile = ({ user, variant = "circular", borderRadius }: Props) => {
   const dispatch = useDispatch();
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const [avatar, setAvatar] = useState<Attachment>({
      url: user?.avatar,
   });
   const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);
   const [showActions, setShowActions] = useState<boolean>(false);

   useEffect(() => {
      return () => {
         URL.revokeObjectURL(avatar.url);
      };
   }, [avatar]);

   const onChange = (files: File[], blobs: string[]) => {
      setAvatar({
         file: files[0],
         url: blobs[0],
      });
      setShowActions(true);
   };

   // Open full image
   const onOpen = () => {
      user?.avatar && setOpenFullScreen(true);
   };

   // Close full image
   const onClose = () => {
      setOpenFullScreen(false);
   };

   // Confirm to change avatar
   const handleSaveNewAvatar = () => {
      dispatch(
         updateProfile({ newAvatar: avatar.file, deletedImages: [user.avatar], _id: user._id })
      );
      URL.revokeObjectURL(avatar.url);
      setShowActions(false);
   };

   // Cancel preview avatar
   const handleResetAvatar = () => {
      setAvatar((prev) => {
         delete prev.file;
         return { url: user.avatar };
      });
      URL.revokeObjectURL(avatar.url);
      setShowActions(false);
   };

   return (
      <Box>
         <WrapAvatar>
            <Avatar
               variant={variant}
               src={avatar.url}
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
         {showActions && (
            <Stack gap={2} mt={1} justifyContent="center" flexDirection="row">
               <Tooltip title="Cancel">
                  <Fab size="medium" color="error" onClick={handleResetAvatar}>
                     <CloseIcon />
                  </Fab>
               </Tooltip>
               <Tooltip title="Save">
                  <Fab size="medium" color="info" onClick={handleSaveNewAvatar}>
                     <SendIcon />
                  </Fab>
               </Tooltip>
            </Stack>
         )}
         <OverlayFullImage open={openFullScreen} src={user?.avatar} onClose={onClose} />
      </Box>
   );
};

export default AvatarProfile;
