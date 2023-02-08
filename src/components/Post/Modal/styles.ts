import { Box, styled } from "@mui/material";

export const MyBox = styled(Box)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: "50vw",
   maxHeight: "90vh",
   overflow: "auto",
   backgroundColor: "#fff",
   border: "1px solid #000",
   padding: "24px",
   borderRadius: 2,
   boxShadow:
      "box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
}));

// export const CloseButton = styled(Button)(({ theme }) => ({
//    position: "absolute",
//    top: "2%",
//    right: "2%",
//    zIndex: "999",
//    maxHeight: "32px",
//    minWidth: "32px",
//    maxWidth: "32px",
//    borderRadius: "50%",
//    backgroundColor: "rgba(255,255,255,0.3)",
// }));
