import { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Box } from "@mui/material";
const Spinner = ({ show }: { show: boolean }) => {
   return (
      <>
         {show && (
            <Backdrop open sx={{ zIndex: 999 }}>
               <CircularProgress />
            </Backdrop>
         )}
      </>
   );
};

export default memo(Spinner);
