import { AppBar, Grid, Toolbar, useTheme } from "@mui/material";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./ToggleActions";
import Messenger from "./Messenger";
const Header = () => {
   const theme = useTheme();

   return (
      <AppBar position="fixed" sx={{ bgcolor: theme.myColor.white, boxShadow: 1 }}>
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

               {/* Messenger */}
               <Grid item>
                  <Messenger />
               </Grid>

               {/* Switch button change theme */}
               <Grid item>{/* <SwitchTheme /> */}</Grid>

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
