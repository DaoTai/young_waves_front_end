import { Cyclone as CycloneIcon } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import { Logo } from "../styles";
const MyLogo = () => {
   return (
      <Logo to="/">
         <Stack direction="row" alignItems="flex-end" sx={{ gap: 1 }}>
            <CycloneIcon fontSize="large" color="secondary" />
            <Typography
               variant="h5"
               color="primary"
               sx={{ textShadow: "2px 2px 2px rgba(0,0,0,0.2)" }}>
               Young Waves
            </Typography>
         </Stack>
      </Logo>
   );
};

export default MyLogo;
