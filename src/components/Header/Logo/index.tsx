import { Cyclone as CycloneIcon } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";
import Icon from "/vite.svg";
import { Logo } from "../styles";
const MyLogo = () => {
   const theme = useTheme();

   return (
      <Logo to="/" onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}>
         <Stack direction="row" alignItems="center" gap={1}>
            <img src={Icon} alt="Logo" style={{ zoom: 1.4 }} />
            <Typography
               variant="h4"
               component="span"
               color="primary"
               sx={{
                  textShadow: `1px 1px 1px ${theme.palette.primary.main}`,
                  display: {
                     md: "block",
                     sm: "none",
                     xs: "none",
                  },
               }}>
               Young Waves
            </Typography>
         </Stack>
      </Logo>
   );
};

export default MyLogo;
