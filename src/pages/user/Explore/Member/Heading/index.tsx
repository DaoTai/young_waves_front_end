import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Image } from "../../../../../components";

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
            <Image src={avatar} circle width="180px" height="180px" boxShadow={2} border={1} />
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
