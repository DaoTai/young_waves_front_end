import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Heading = ({ avatar = "", fullName = "" }: { avatar?: string; fullName?: string }) => {
   const navigate = useNavigate();
   return (
      <Grid container p={1} borderBottom={1} justifyContent="center" alignItems="center">
         <Grid item xs={12} md={3}>
            <Avatar
               src={avatar}
               srcSet={avatar}
               sx={{ cursor: "pointer", width: "168px", height: "168px" }}
            />
         </Grid>
         <Grid item xs={12} md={5}>
            <Typography variant="h5">{fullName}</Typography>
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
