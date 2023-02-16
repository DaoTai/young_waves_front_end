import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";

import { Container, Stack, useTheme } from "@mui/material";
import NavLink from "../../NavLink";
const Navigation = () => {
   const theme = useTheme();
   return (
      <Container maxWidth="md">
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" sx={{ gap: 4 }}>
               <NavLink to="/">
                  <HomeIcon fontSize="large" />
               </NavLink>
               <NavLink to="/user/explore">
                  <ExploreIcon fontSize="large" />
               </NavLink>
            </Stack>
         </Stack>
      </Container>
   );
};

export default Navigation;
