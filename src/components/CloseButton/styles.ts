import { Button, styled } from "@mui/material";

export const CloseButton = styled(Button)(({ theme }) => ({
   position: "absolute",
   top: 10,
   right: "1%",
   zIndex: 999,
   maxHeight: 40,
   minWidth: 40,
   maxWidth: 40,
   borderRadius: "50%",
   backgroundColor: theme.palette.gray.main,
   boxShadow: theme.shadows[2],
   transition: "0.3s linear all",
   "&:hover": {
      opacity: 0.6,
   },
   "&.small": {
      maxHeight: 32,
      minWidth: 32,
      maxWidth: 32,
   },
}));
