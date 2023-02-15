import { styled } from "@mui/material";
import ImageIcon from "../../assets/images/image-icon.png";
export const MyLabel = styled("label")({
   marginTop: 8,
   display: "block",
   borderRadius: 4,
   padding: 8,
   cursor: "pointer",
   "&:hover": {
      opacity: 0.7,
   },
});

export const WrapFileInput = styled("div")({
   width: "50px",
   height: "50px",
   textAlign: "center",
   display: "flex",
   alignItems: "center",
   margin: "auto",
   borderRadius: "99px",
   border: "1px solid transparent",
   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
   transition: "0.3s ease all",
   "&:hover": {
      borderColor: "#333",
      backgroundColor: "#fff",
   },
   "& input": {
      cursor: "pointer",
      color: "transparent",
      width: "100%",
      // height: 50,
      paddingTop: "50%",
      background: `url(${ImageIcon}) center center no-repeat`,
      "&::-webkit-file-upload-button": {
         display: "none",
      },
   },
});
