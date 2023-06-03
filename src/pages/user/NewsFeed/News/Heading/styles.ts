import { Popover, styled } from "@mui/material";

export const Actions = styled(Popover)(({ theme }) => ({
   button: {
      justifyContent: "flex-start",
      textTransform: "none",
      backgroundColor: theme.palette.white.main,
      color: theme.palette.link.main,
      borderRadius: 0,
      "&:not(:first-of-type)": {
         borderTop: "1px solid #ccc",
      },
   },
   "& button:hover": {
      background: theme.palette.link.main,
      color: theme.palette.white.main,
   },
}));
