import { styled, List } from "@mui/material";

export const WrapFeatures = styled(List)(({ theme }) => ({
   // position: "fixed",
   // top: 0,
   // bottom: 0,
   // left: 0,
   // zIndex: 10,
   // width: "15vw",
   color: theme.myColor.white,
   ".MuiListItem-root": {
      borderTop: `1px solid ${theme.myColor.white}`,
      borderBottom: `1px solid ${theme.myColor.white}`,
      cursor: "pointer",
      "&:hover": {
         opacity: 0.8,
      },
   },
}));
