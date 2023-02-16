import { AppBar, Toolbar, Grid } from "@mui/material";

import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./ToggleActions";
import Search from "./Search";
import SwitchTheme from "./SwitchTheme";
const Header = () => {
   return (
      <AppBar position="fixed" sx={{ backgroundColor: "#f5f5f5" }}>
         <Toolbar>
            <Grid
               container
               justifyContent="space-between"
               gap={4}
               alignItems="center"
               flexWrap="nowrap">
               <Grid item>
                  <Logo />
               </Grid>
               {/* Navigation */}
               <Grid item mr="auto">
                  <Navigation />
               </Grid>

               {/* Search */}
               <Grid item>
                  <Search />
               </Grid>

               {/* Switch button change theme */}
               <Grid item>
                  <SwitchTheme />
               </Grid>

               {/* Toggle */}
               <Grid item>
                  <Actions />
               </Grid>
            </Grid>
         </Toolbar>
      </AppBar>
   );
};

export default Header;
