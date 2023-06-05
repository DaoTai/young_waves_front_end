import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Fab, Stack, Tooltip, useTheme } from "@mui/material";
import { useState, ReactNode, useEffect } from "react";
import { Profile } from "../../../../../utils/interfaces/Profile";
import { useDispatch, useSelector } from "react-redux";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { ImageInput } from "../../../../../components";
import { updateProfile } from "../../../../../redux-saga/redux/actions";
import { Attachment } from "../../../../../utils/interfaces/Attachment";

const CoverPicture = ({ user, children }: { user: Profile; children?: ReactNode }) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const auth$ = useSelector(authState$);
   const idAuth = auth$?.payload?.user._id;
   const [coverPicture, setCoverPicture] = useState<Attachment>({
      url: user?.coverPicture ?? "",
   });
   const [showActions, setShowActions] = useState<boolean>(false);

   useEffect(() => {
      return () => {
         URL.revokeObjectURL(coverPicture.url);
      };
   }, [coverPicture]);

   // Change cover picture
   const handleChangeCoverPicture = (files: File[], blobs: string[]) => {
      setCoverPicture({
         url: blobs[0],
         file: files[0],
      });
      setShowActions(true);
   };

   // Cancel change cover picture
   const handleResetCoverPicture = () => {
      URL.revokeObjectURL(coverPicture.url);
      setCoverPicture((prev) => {
         delete prev.file;
         return {
            url: user?.coverPicture ?? "",
         };
      });
      setShowActions(false);
   };

   // Submit new coverpicture
   const handleSavePicture = () => {
      dispatch(
         updateProfile({
            newCoverPicture: coverPicture.file,
            _id: user._id,
         })
      );
      setShowActions(false);
   };

   return (
      <Box
         width="100%"
         minHeight={450}
         alignItems="center"
         overflow="hidden"
         position="relative"
         sx={
            coverPicture.url
               ? {
                    backgroundImage: `url(${coverPicture.url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                 }
               : {
                    backgroundImage: theme.palette.gradient.main,
                 }
         }>
         {/* Button change cover picture */}
         {idAuth === user?._id && (
            <>
               <Fab
                  size="small"
                  sx={{
                     backgroundColor: theme.palette.white.main,
                     position: "absolute",
                     top: 5,
                     right: 5,
                     transform: "translate(-5px, 5px)",
                     boxShadow: "none",
                  }}>
                  <ImageInput onChange={handleChangeCoverPicture} />
               </Fab>
               {showActions && (
                  <Stack
                     gap={2}
                     mt={1}
                     justifyContent="center"
                     flexDirection="row"
                     sx={{
                        position: "absolute",
                        zIndex: 2,
                        bottom: 5,
                        right: 5,
                        transform: "translate(-5px, -5px)",
                     }}>
                     <Tooltip title="Cancel">
                        <Fab size="medium" color="error" onClick={handleResetCoverPicture}>
                           <CloseIcon />
                        </Fab>
                     </Tooltip>
                     <Tooltip title="Save">
                        <Fab size="medium" color="info" onClick={handleSavePicture}>
                           <SendIcon />
                        </Fab>
                     </Tooltip>
                  </Stack>
               )}
            </>
         )}
         {children}
      </Box>
   );
};

export default CoverPicture;
