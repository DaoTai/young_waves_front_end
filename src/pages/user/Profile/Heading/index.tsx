import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Fab, Grid, Typography, useTheme } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageInput, Spinner } from "../../../../components";
import { addFriend, updateProfile } from "../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import Avatar from "./Avatar";
const Heading = ({ user }: { user: Profile }) => {
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const auth$ = useSelector(authState$);
   const imageRef = useRef(Object(null));
   const idAuth = auth$?.payload?.user._id;
   const isStrange = !auth$.payload.user.friends.includes(user._id);

   // Change cover picture
   const handleChangeCoverPicture = (file: string) => {
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
            minHeight={400}
            overflow="hidden"
            position="relative"
            alignItems="center"
            gap={2}
            sx={
               user?.coverPicture
                  ? {
                       justifyContent: { lg: "flex-start", md: "flex-start", xs: "center" },
                       gap: { lg: 4, md: 4, sm: 4, xs: 2 },
                       backgroundImage: `url(${user?.coverPicture})`,
                       bgcolor: theme.myColor.black,
                       backgroundPosition: "top",
                       backgroundSize: "contain",
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
                  {user?.isAdmin && <CheckCircleIcon color="primary" sx={{ ml: 0.25 }} />}
               </Typography>
               <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ color: theme.myColor.white, textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
                  {user.totalPosts && user.totalPosts > 1
                     ? user.totalPosts + " posts"
                     : user.totalPosts + " post"}
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
               {idAuth !== user?._id && isStrange && (
                  <Button
                     sx={{
                        mt: 2,
                        color: theme.myColor.white,
                     }}
                     size="large"
                     variant="contained"
                     endIcon={<PersonAddIcon />}
                     onClick={handleAddFriend}>
                     Add friend
                  </Button>
               )}
            </Grid>
         </Grid>

         {/* Spinner */}
         <Spinner show={auth$.isLoading} />
      </>
   );
};

export default Heading;
