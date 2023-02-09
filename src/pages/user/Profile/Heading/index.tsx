import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postsState$, profileState$ } from "../../../../redux-saga/redux/selectors";
import { Post as IPost } from "../../../../utils/interfaces/Post";
import Avatar from "./Avatar";
const Heading = () => {
   const navigate = useNavigate();
   const { isLoading, payload } = useSelector(profileState$);

   const posts$ = useSelector(postsState$);
   const totalPost = useMemo(() => {
      const posts = posts$?.payload?.data as IPost[] | [];
      const ownPostLength = posts.filter((post) => post?.author?._id === payload?.data?._id).length;
      return ownPostLength;
   }, [payload]);
   console.log(totalPost);
   return (
      <Grid container p={1} borderBottom={1} justifyContent="flex-start" alignItems="center">
         <Grid item xs={12} md={3}>
            <Avatar image={payload?.data?.avatar} />
         </Grid>
         <Grid item xs={12} md={5}>
            <Typography variant="h5">{payload?.data?.fullName}</Typography>
            <Typography variant="subtitle1">
               {totalPost > 1 ? totalPost + " posts" : totalPost + " post"}
            </Typography>
            <Button
               sx={{ mt: 2 }}
               variant="outlined"
               endIcon={<EditIcon />}
               onClick={() => navigate("/user/profile/edit")}>
               Edit profile
            </Button>
         </Grid>
      </Grid>
   );
};

export default Heading;
