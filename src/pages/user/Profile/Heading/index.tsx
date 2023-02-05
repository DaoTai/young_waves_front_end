import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import Avatar from "./Avatar";
const Heading = () => {
   const navigate = useNavigate();
   const { isLoading, payload } = useSelector(profileState$);
   return (
      <Grid container p={1} borderBottom={1} justifyContent="center" alignItems="center">
         <Grid item xs={12} md={3}>
            <Avatar image={payload?.data?.avatar} />
         </Grid>
         <Grid item xs={12} md={5}>
            <Typography variant="h5">{payload?.data?.fullName}</Typography>
            <Typography variant="subtitle1">?? posts</Typography>
         </Grid>
         <Grid item xs={12} md={4}>
            <Button
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
