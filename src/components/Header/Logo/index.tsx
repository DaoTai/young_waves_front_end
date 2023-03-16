import { Cyclone as CycloneIcon } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";

import { Logo } from "../styles";
const MyLogo = () => {
   const theme = useTheme();
   return (
      <Logo to="/">
         <Stack direction="row" alignItems="center" sx={{ gap: 2 }}>
            <CycloneIcon fontSize="large" color="primary" />
            <Typography
               variant="h4"
               color="primary"
               sx={{
                  textShadow: `1px 1px 1px ${theme.palette.primary.main}`,
               }}>
               Young Waves
            </Typography>
         </Stack>
      </Logo>
   );
};

export default MyLogo;
