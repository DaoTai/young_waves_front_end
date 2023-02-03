import { Cyclone as CycloneIcon } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import { Logo } from "../styles";
const MyLogo = () => {
   return (
      <Logo to="/">
         <Stack direction="row" alignItems="flex-end" sx={{ gap: 1 }}>
            <CycloneIcon fontSize="large" color="secondary" />
            <Typography variant="h5" color="primary">
               Young Waves
            </Typography>
         </Stack>
      </Logo>
   );
};

export default MyLogo;
