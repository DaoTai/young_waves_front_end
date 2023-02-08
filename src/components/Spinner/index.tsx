import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
const Spinner = ({ show }: { show: boolean }) => {
   return (
      <>
         {show && (
            <Box
               sx={{
                  position: "fixed",
                  inset: "0 0 0 0",
                  zIndex: 9999,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}>
               <CircularProgress />
            </Box>
         )}
      </>
   );
};

export default Spinner;
