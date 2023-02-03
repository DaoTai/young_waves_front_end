import { Avatar, Grid, Typography, Button } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
const Heading = () => {
   return (
      <Grid container p={1} borderBottom={1} justifyContent="center" alignItems="center">
         <Grid item xs={12} md={3}>
            <Avatar
               srcSet="https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414"
               sx={{ cursor: "pointer", width: "168px", height: "168px" }}
            />
         </Grid>
         <Grid item xs={12} md={5}>
            <Typography variant="h5">Dao Tai</Typography>
            <Typography variant="subtitle1">12 posts</Typography>
         </Grid>
         <Grid item xs={12} md={4}>
            <Button variant="outlined" endIcon={<EditIcon />}>
               Edit profile
            </Button>
         </Grid>
      </Grid>
   );
};

export default Heading;
