import React from "react";
import { CloseButton } from "./styles";
import { useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type Size = "small" | "inherit" | "medium" | "large";
const MyCloseButton = ({ onClick, size = "medium" }: { size?: Size; onClick: () => void }) => {
   const theme = useTheme();
   return (
      <CloseButton onClick={onClick} sx={{ padding: size === "large" ? 3 : 1 }}>
         <CloseIcon fontSize={size} sx={{ color: theme.myColor.textSecondary }} />
      </CloseButton>
   );
};

export default MyCloseButton;
