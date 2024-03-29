import { AppBar, Box, Grid, Toolbar, useTheme } from "@mui/material";
import { HEIGHT_HEADER } from "../../utils/constants";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./ToggleActions";
import Messenger from "./Messenger";
import ChangeModeButton from "../ChangeModeButton";
const Header = () => {
   const theme = useTheme();

   return (
      <>
         <AppBar sx={{ background: theme.palette.white.main, boxShadow: 1, height: HEIGHT_HEADER }}>
            <Toolbar>
               <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="nowrap"
                  gap={2}
                  pt={1}>
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
                     display="flex"
                     gap={2}
                     sx={{
                        ml: {
                           xs: "auto",
                        },
                     }}>
                     <ChangeModeButton />
                     <Messenger />
                  </Grid>

                  {/* Action user */}
                  <Grid item>
                     <Actions />
                  </Grid>
               </Grid>
            </Toolbar>
         </AppBar>

         {/* Mobile */}
         <Box
            sx={{
               position: "fixed",
               bottom: 0,
               left: 0,
               right: 0,
               zIndex: 999,
               borderTop: 1,
               borderColor: "divider",
               bgcolor: theme.palette.white.main,
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
