import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import { Container, InputAdornment, Stack } from "@mui/material";
import NavLink from "../../NavLink";
import Search from "../../BaseInput";
const Navigation = () => {
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
            <Search
               placeholder="Search..."
               endAdornment={
                  <InputAdornment position="end">
                     <SearchIcon />
                  </InputAdornment>
               }
            />
         </Stack>
      </Container>
   );
};

export default Navigation;
