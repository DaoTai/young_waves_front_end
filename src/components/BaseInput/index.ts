import { Input, styled } from "@mui/material";

const BaseInput = styled(Input)(({ theme }) => ({
   borderRadius: "12px",
   padding: 4,
   border: "1px solid transparent",
   "&:before, &:after": {
      content: "none",
   },
   "&:focus-within": {
      borderColor: theme.palette.primary.light,
   },
   input: {
      letterSpacing: 1.25,
      caretColor: theme.palette.primary.main,
      "&:placeholder-shown": {
         paddingLeft: "2px",
      },
   },
}));

export default BaseInput;
