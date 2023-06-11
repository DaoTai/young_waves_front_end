import { styled, Alert } from "@mui/material";
import { keyframes } from "@mui/system";
const fadeOut = keyframes`
0% {
  opacity: 0.8;
  transform: translateX(-100px);
}
50% {
  transform: translateX(10px);
}
75% {
  opacity: 1;
  transform: translateX(-10px);
}
100% {
  transform: translateX(0);
}
`;

const scaleX = keyframes` from {
  transform: scaleX(0);
}
to {
  transform: scaleX(1);
}`;

export const MyAlert = styled(Alert)(({ theme }) => ({
   position: "fixed",
   zIndex: 999,
   top: "2%",
   left: "1%",
   minWidth: "250px",
   border: "none",
   borderWidth: 1.5,
   boxShadow: theme.shadows[2],
   backgroundColor: "#fff",
   animation: `1.4s ease-in-out ${fadeOut} `,
   "&:after": {
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: 3,
      background: "currentColor",
      // background: theme.palette.gradient.main,
      transformOrigin: "left",
      animation: `${scaleX} 2s linear`,
   },
}));
