import { Popover, styled } from "@mui/material";

export const Actions = styled(Popover)(({ theme }) => ({
   button: {
      justifyContent: "flex-start",
      textTransform: "none",
      backgroundColor: theme.myColor.white,
      color: theme.myColor.link,
      borderRadius: 0,
      "&:not(:first-of-type)": {
         borderTop: "1px solid #ccc",
      },
   },
   "& button:hover": {
      background: theme.myColor.link,
      color: theme.myColor.white,
   },
}));
