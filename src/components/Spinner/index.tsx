import { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
const Spinner = ({ show }: { show: boolean }) => {
   return (
      <>
         {show && (
            <Backdrop open color="primary" sx={{ zIndex: 999, bgcolor: "transparent" }}>
               <CircularProgress />
            </Backdrop>
         )}
      </>
   );
};

export default memo(Spinner);
