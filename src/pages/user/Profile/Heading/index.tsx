import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postsState$, profileState$, authState$ } from "../../../../redux-saga/redux/selectors";
import { Post as IPost } from "../../../../utils/interfaces/Post";
import Avatar from "./Avatar";
const Heading = () => {
   const navigate = useNavigate();
   const { isLoading, payload } = useSelector(profileState$);
   const posts$ = useSelector(postsState$);
   const {
      payload: {
         data: {
            payload: { _id },
         },
      },
   } = useSelector(authState$);
   const totalPost = useMemo(() => {
      const posts = posts$?.payload?.data as IPost[] | [];
      const ownPostLength = posts?.filter(
         (post) => post?.author?._id === payload?.data?._id
      ).length;
      return ownPostLength;
   }, [posts$, payload]);
   return (
      <Grid
         container
         p={1}
         spacing={2}
         justifyContent="flex-start"
         alignItems="center"
         overflow="hidden">
         <Grid item>
            <Avatar image={payload?.data?.avatar} />
         </Grid>
         <Grid item>
            <Typography
               variant="h4"
               fontWeight={600}
               sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
               {payload?.data?.fullName}
            </Typography>
            <Typography variant="subtitle1">
               {totalPost > 1 ? totalPost + " posts" : totalPost + " post"}
            </Typography>
            {_id === payload?.data?._id && (
               <Button
                  sx={{ mt: 2 }}
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
