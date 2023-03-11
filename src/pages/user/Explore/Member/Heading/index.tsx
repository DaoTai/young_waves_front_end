import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Heading = ({ avatar, fullName }: { avatar: string; fullName: string }) => {
   return (
      <Grid
         container
         p={1}
         spacing={2}
         justifyContent="flex-start"
         alignItems="center"
         overflow="hidden">
         <Grid item>
            <Avatar src={avatar} sx={{ width: 100, height: 100, boxShadow: 1, border: 1 }} />
         </Grid>
         <Grid item>
            <Typography
               variant="h4"
               fontWeight={600}
               sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}>
               {fullName}
            </Typography>
         </Grid>
      </Grid>
   );
};

export default Heading;
