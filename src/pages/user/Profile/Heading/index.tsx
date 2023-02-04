import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
const Heading = () => {
   const { user } = useSelector(profileState$) as { user: Profile };
   const navigate = useNavigate();
   return (
      <Grid container p={1} borderBottom={1} justifyContent="center" alignItems="center">
         <Grid item xs={12} md={3}>
            <Avatar
               src={user.avatar}
               srcSet={user.avatar}
               sx={{ cursor: "pointer", width: "168px", height: "168px" }}
            />
         </Grid>
         <Grid item xs={12} md={5}>
            <Typography variant="h5">{user.fullName}</Typography>
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
