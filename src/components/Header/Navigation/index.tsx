import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import { Container, Stack, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { authState$ } from "../../../redux-saga/redux/selectors";
import NavLink from "../../NavLink";
const Navigation = () => {
   const theme = useTheme();
   const { isLoading, payload } = useSelector(authState$);
   const isAdmin = payload?.user.isAdmin;
   return (
      <Container maxWidth="md" sx={{ bgcolor: theme.myColor.white }}>
         <Stack direction="row" justifyContent="center" sx={{ gap: 4 }}>
            <NavLink to="/">
               <HomeIcon fontSize="large" />
            </NavLink>
            <NavLink to="/user/explore">
               <ExploreIcon fontSize="large" />
            </NavLink>
            {isAdmin && (
               <NavLink to="/admin">
                  <ManageAccountsIcon fontSize="large" />
               </NavLink>
            )}
         </Stack>
         {/* </Stack> */}
      </Container>
   );
};

export default Navigation;
