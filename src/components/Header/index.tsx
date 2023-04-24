import { AppBar, Box, Grid, Toolbar, useTheme } from "@mui/material";
import { HEIGHT_HEADER } from "../../utils/constants";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./ToggleActions";
import Messenger from "./Messenger";
const Header = () => {
   const theme = useTheme();

   return (
      <>
         <AppBar sx={{ bgcolor: theme.myColor.white, boxShadow: 1, height: HEIGHT_HEADER }}>
            <Toolbar>
               <Grid
                  container
                  bgcolor={theme.myColor.white}
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}>
                  {/* Logo */}
                  <Grid item>
                     <Logo />
                  </Grid>
                  {/* Navigation */}
                  <Grid
                     item
                     mr="auto"
                     sx={{
                        display: {
                           sm: "block",
                           xs: "none",
                        },
                     }}>
                     <Navigation />
                  </Grid>

                  {/* Messenger */}
                  <Grid
                     item
                     ml={1}
                     mr={2}
                     sx={{
                        ml: {
                           xs: "auto",
                        },
                     }}>
                     <Messenger />
                  </Grid>

                  {/* Toggle */}
                  <Grid item>
                     <Actions />
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>

         {/* Mobile */}
         <Box
            sx={{
               position: "sticky",
               top: HEIGHT_HEADER,
               zIndex: 999,
               pt: 1,
               borderBottom: 1,
               borderColor: "divider",
               bgcolor: theme.myColor.white,
               display: {
                  sm: "none",
                  xs: "block",
               },
            }}>
            <Navigation />
         </Box>
      </>
   );
};

export default Header;
