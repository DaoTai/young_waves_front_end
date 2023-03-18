import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { ImageInput } from "../../../../components";
import Avatar from "./Avatar";
const Heading = ({ user }: { user: Profile }) => {
   const theme = useTheme();
   const navigate = useNavigate();
   const {
      payload: {
         data: {
            user: { _id },
         },
      },
   } = useSelector(authState$);
   return (
      <Grid
         container
         p={1}
         gap={3}
         width="100%"
         height={300}
         justifyContent="flex-start"
         alignItems="center"
         overflow="hidden"
         position="relative">
         {/* Cover picture */}
         <Box sx={{ position: "absolute", zIndex: 0, inset: 0 }}>
            <img src={user?.coverPicture} width="100%" />
            <ImageInput onChange={() => console.log(123)} />
         </Box>
         <Grid item position="relative" zIndex={2}>
            <Avatar user={user} />
         </Grid>
         <Grid item position="relative" zIndex={2}>
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
               {user?.totalPosts > 1 ? user?.totalPosts + " posts" : user?.totalPosts + " post"}
            </Typography>
            {_id === user?._id && (
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
         </Grid>
      </Grid>
   );
};

export default Heading;
