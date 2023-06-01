import { Button, styled } from "@mui/material";

export const CloseButton = styled(Button)(({ theme }) => ({
   position: "absolute",
   top: "4px",
   right: "2px",
   zIndex: 999,
   maxHeight: "32px",
   minWidth: "32px",
   maxWidth: "32px",
   borderRadius: "50%",
   backgroundColor: theme.myColor.bgGray,
   "&:hover": {
      color: "#fff !important",
   },
   "&.MuiButton-textPrimary": {
      color: "#fff !important",
   },
}));
