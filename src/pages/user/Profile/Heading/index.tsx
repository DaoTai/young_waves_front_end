import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminIcon, Spinner } from "../../../../components";
import { addFriend } from "../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import Avatar from "./Avatar";
import CoverPicture from "./CoverPicture";
const Heading = ({ user }: { user: Profile }) => {
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const auth$ = useSelector(authState$);
   const idAuth = auth$?.payload?.user._id;
   const isStrange = !auth$.payload.user.friends.includes(user._id);

   // Add friend
   const handleAddFriend = () => {
      dispatch(addFriend(user._id));
   };

   return (
      <>
         {/* Cover picture */}
         <CoverPicture user={user}>
            <Grid
               container
               p={4}
               minHeight={400}
               overflow="hidden"
               position="relative"
               alignItems="center"
               justifyContent={{ md: "flex-start", xs: "center" }}
               gap={4}>
               {/* Avatar */}
               <Grid item>
                  <Avatar user={user} />
               </Grid>
               {/* Name & total posts */}
               <Grid item color="#fff">
                  <Typography variant="h4" fontWeight={600} display="flex" alignItems="center">
                     {user?.fullName}
                     {user?.isAdmin && <AdminIcon fontSize="large" />}
                  </Typography>
                  <Typography
                     variant="subtitle1"
                     fontWeight={600}
                     mb={1}
                     sx={{
                        textShadow: "3px 0px 4px rgba(0,0,0,0.3)",
                     }}>
                     {user.totalPosts && user.totalPosts > 1
                        ? user.totalPosts + " posts"
                        : user.totalPosts + " post"}
                  </Typography>

                  {/* Show button edit */}
                  {idAuth === user?._id && (
                     <Button
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
                           color: theme.palette.white.main,
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
         </CoverPicture>

         {/* Spinner */}
         <Spinner show={auth$.isLoading} />
      </>
   );
};

export default Heading;
