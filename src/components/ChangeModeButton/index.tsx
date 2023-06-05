import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button, Fab, Tooltip, useColorScheme, useTheme } from "@mui/material";

const ChangeModeButton = () => {
   const theme = useTheme();
   const { mode, setMode } = useColorScheme();
   return (
      <Tooltip title="Mode">
         <Fab size="small" sx={{ background: theme.palette.gradient.main }} onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            {mode === "light" ? (
               <LightModeIcon sx={{ color: theme.palette.white.main }} />
            ) : (
               <DarkModeIcon sx={{ color: theme.palette.black.main }} />
            )}
         </Fab>
      </Tooltip>
   );
};

export default ChangeModeButton;
