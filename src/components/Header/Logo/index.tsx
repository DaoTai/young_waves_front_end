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
            <Typography variant="gradient" component="h2" fontWeight={600}>
               Young Waves
            </Typography>
         </Stack>
      </Logo>
   );
};

export default MyLogo;
