import { Switch, useTheme, PaletteMode } from "@mui/material";
import { useState } from "react";

const SwitchTheme = () => {
   const [mode, setMode] = useState<PaletteMode>("light");

   return <Switch />;
};

export default SwitchTheme;
