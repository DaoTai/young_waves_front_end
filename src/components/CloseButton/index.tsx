import React from "react";
import { CloseButton } from "./styles";
import CloseIcon from "@mui/icons-material/Close";
type Size = "small" | "inherit" | "medium" | "large";
const MyCloseButton = ({ onClick, size = "medium" }: { size?: Size; onClick: any }) => {
   return (
      <CloseButton onClick={onClick} sx={{ padding: size === "large" ? 3 : 1 }}>
         <CloseIcon color="info" fontSize={size} />
      </CloseButton>
   );
};

export default MyCloseButton;
