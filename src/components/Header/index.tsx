import { AppBar, Toolbar } from "@mui/material";

import Logo from "./Logo";
import Navigation from "./Navigation";
import Actions from "./ToggleActions";
const Header = () => {
   return (
      <AppBar position="fixed" sx={{ backgroundColor: "#f5f5f5" }}>
         <Toolbar>
            <Logo />
            {/* Navigation */}
            <Navigation />

            {/* Toggle */}
            <Actions />
         </Toolbar>
      </AppBar>
   );
};

export default Header;
