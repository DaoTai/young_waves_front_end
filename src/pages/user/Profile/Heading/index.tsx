import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Fab, Grid, Typography, useTheme } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageInput, Spinner } from "../../../../components";
import { addFriend, updateProfile } from "../../../../redux-saga/redux/actions";
import { authState$, profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import Avatar from "./Avatar";
const Heading = ({ user }: { user: Profile & { totalPosts: number } }) => {
   const theme = useTheme();
   const navigate = useNavigate();
   const auth$ = useSelector(authState$);
   const idAuth = auth$?.payload?.user._id;
   const { isLoading, payload } = useSelector(profileState$);

   const dispatch = useDispatch();
   const imageRef = useRef(Object(null));

   // Change cover picture
   const handleChangeCoverPicture = (file) => {
      imageRef.current.src = file;
      dispatch(updateProfile({ coverPicture: file, _id: user._id }));
   };

   // Add friend
   const handleAddFriend = () => {
      dispatch(addFriend(user._id));
   };

   return (
      <>
         <Grid
            container
            p={1}
            gap={4}
            width="100%"
            minHeight={350}
            alignItems="center"
            overflow="hidden"
            position="relative"
            sx={
               user?.coverPicture
                  ? {
                       backgroundImage: `url(${user?.coverPicture})`,
                       backgroundPosition: "center",
                       backgroundSize: "cover",
                       backgroundRepeat: "no-repeat",
                    }
                  : {
                       backgroundImage: `linear-gradient(45deg, ${theme.myColor.text}, transparent)`,
                    }
            }>
            {/* Button change cover picture */}
            {idAuth === user?._id && (
               <Fab
                  size="small"
                  sx={{
                     backgroundColor: theme.myColor.white,
                     position: "absolute",
                     top: 5,
                     right: 5,
                     transform: "translate(-5px, 5px)",
                     boxShadow: "none",
                  }}>
                  <ImageInput onChange={handleChangeCoverPicture} />
               </Fab>
            )}
            {/* Avatar */}
            <Grid item>
               <Avatar user={user} />
            </Grid>
            {/* Name & total posts */}
            <Grid item>
               <Typography
                  variant="h4"
                  fontWeight={600}
                  sx={{ color: theme.myColor.white, textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
                  {user?.fullName}
               </Typography>
               <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ color: theme.myColor.white, textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
                  {user?.totalPosts && user?.totalPosts > 1
                     ? user?.totalPosts + " posts"
                     : user?.totalPosts + " post"}
               </Typography>

               {/* Show button edit */}
               {idAuth === user?._id && (
                  <Button
                     sx={{
                        mt: 2,
                        color: theme.myColor.white,
                        "&:hover": {
                           color: theme.myColor.text,
                           backgroundColor: theme.myColor.white,
                        },
                     }}
                     size="large"
                     variant="outlined"
                     endIcon={<EditIcon />}
                     onClick={() => navigate("/user/profile/edit")}>
                     Edit profile
                  </Button>
               )}
               {/* Show button add friend */}
               {idAuth !== user?._id &&
                  (!payload?.friends?.includes(user?._id) ||
                     auth$?.payload?.user?.friends.includes(user?._id)) && (
                     <Button
                        sx={{
                           mt: 2,
                           color: theme.myColor.white,
                        }}
                        size="large"
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={handleAddFriend}>
                        Add friend
                     </Button>
                  )}
            </Grid>
         </Grid>

         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default Heading;
