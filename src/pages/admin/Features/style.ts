import { styled, List } from "@mui/material";
import { HEIGHT_HEADER } from "../../../utils/constants";
export const WrapFeatures = styled(List)(({ theme }) => ({
   // position: "fixed",
   // top: HEIGHT_HEADER,
   // bottom: 0,
   // left: 0,
   // zIndex: 10,
   color: theme.palette.white.main,
   ".MuiListItem-root": {
      borderTop: `1px solid ${theme.palette.white.main}`,
      borderBottom: `1px solid ${theme.palette.white.main}`,
      cursor: "pointer",
      "&:hover": {
         opacity: 0.8,
      },
   },
}));
