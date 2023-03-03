import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Container, Stack, Tooltip, useTheme } from "@mui/material";
import NavLink from "../../NavLink";
const Navigation = () => {
   const theme = useTheme();
   return (
      <Container maxWidth="md">
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" sx={{ gap: 4 }}>
               <Tooltip title="Home" placement="bottom-end" arrow>
                  <NavLink to="/">
                     <HomeIcon fontSize="large" />
                  </NavLink>
               </Tooltip>
               <Tooltip title="Explore" placement="bottom-end" arrow>
                  <NavLink to="/user/explore">
                     <ExploreIcon fontSize="large" />
                  </NavLink>
               </Tooltip>
               <Tooltip title="Administrator" placement="bottom-end" arrow>
                  <NavLink to="/admin">
                     <AdminPanelSettingsIcon fontSize="large" />
                  </NavLink>
               </Tooltip>
            </Stack>
         </Stack>
      </Container>
   );
};

export default Navigation;
