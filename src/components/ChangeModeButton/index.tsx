import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button, Fab, useColorScheme, useTheme } from "@mui/material";

const ChangeModeButton = () => {
   const theme = useTheme();
   const { mode, setMode } = useColorScheme();
   return (
      <Fab
         size="small"
         sx={{ background: theme.myColor.bgGradient }}
         onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
         {mode === "light" ? (
            <LightModeIcon sx={{ color: theme.myColor.white }} />
         ) : (
            <DarkModeIcon sx={{ color: theme.myColor.black }} />
         )}
      </Fab>
   );
};

export default ChangeModeButton;
