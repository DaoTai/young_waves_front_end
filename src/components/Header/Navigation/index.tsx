import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import { Container, Stack, Tooltip, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { authState$ } from "../../../redux-saga/redux/selectors";
import NavLink from "../../NavLink";
const Navigation = () => {
   const theme = useTheme();
   const { payload } = useSelector(authState$);
   const isAdmin = payload?.user.isAdmin;
   return (
      <Stack direction="row" justifyContent="center" sx={{ gap: 4 }}>
         <Tooltip title="Home">
            <NavLink to="/">
               <HomeIcon fontSize="large" />
            </NavLink>
         </Tooltip>
         <Tooltip title="Explore">
            <NavLink to="/user/explore">
               <ExploreIcon fontSize="large" />
            </NavLink>
         </Tooltip>
         {isAdmin && (
            <Tooltip title="Manage">
               <NavLink to="/admin">
                  <ManageAccountsIcon fontSize="large" />
               </NavLink>
            </Tooltip>
         )}
      </Stack>
   );
};

export default Navigation;
