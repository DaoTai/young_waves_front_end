import { Button, styled } from "@mui/material";

export const CloseButton = styled(Button)(({ theme }) => ({
   position: "absolute",
   top: "4px",
   right: "2px",
   zIndex: "99",
   maxHeight: "32px",
   minWidth: "32px",
   maxWidth: "32px",
   borderRadius: "50%",
   backgroundColor: "rgba(255,255,255,0.3)",
   "&:hover": {
      color: "#fff !important",
   },
   "&.MuiButton-textPrimary": {
      color: "#fff !important",
   },
}));
