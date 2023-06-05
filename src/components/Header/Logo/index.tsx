import { Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Logo } from "../styles";
import Icon from "/vite.svg";
const MyLogo = () => {
   const theme = useTheme();
   const isSmallBreakPoint = useMediaQuery(theme.breakpoints.up("sm"));

   return (
      <Logo to="/" onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}>
         <Stack direction="row" alignItems="center" gap={1}>
            <img src={Icon} alt="Logo" style={{ zoom: 1.4 }} />
            {isSmallBreakPoint && (
               <Typography variant="gradient" component="h1" whiteSpace="pre" fontWeight={600}>
                  Young Waves
               </Typography>
            )}
         </Stack>
      </Logo>
   );
};

export default MyLogo;
