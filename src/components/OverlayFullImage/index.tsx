import React, { useEffect } from "react";
import CloseButton from "../CloseButton";
import { LayOutWrapper } from "./style";
import { Box, Paper } from "@mui/material";
interface Props {
   open: boolean;
   src: string;
   alt?: string;
   onClose: () => void;
}
const OverlayFullImage = ({ open, src, onClose, alt = "image" }: Props) => {
   useEffect(() => {
      const handleClose = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleClose);
      return () => {
         window.removeEventListener("keydown", handleClose);
      };
   }, []);
   return (
      <>
         {open && src && (
            <LayOutWrapper onClick={onClose}>
               <CloseButton size="large" onClick={onClose} />
               <Box>
                  <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
               </Box>
            </LayOutWrapper>
         )}
      </>
   );
};

export default OverlayFullImage;
