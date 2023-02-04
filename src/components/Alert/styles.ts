import { styled, Alert } from "@mui/material";
import { keyframes } from "@mui/system";
const myEffect = keyframes`
0% {
  opacity: 0;
  transform: translateX(200%);
}
100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const MyAlert = styled(Alert)(({ theme }) => ({
   position: "fixed",
   zIndex: 999,
   bottom: "1%",
   right: "1%",
   minWidth: "250px",
   backgroundColor: "#fff",
   animation: `1s ease ${myEffect} `,
}));
