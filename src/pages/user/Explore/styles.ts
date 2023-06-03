import { InputAdornment, styled } from "@mui/material";

export const ClearButton = styled(InputAdornment)(({ theme }) => ({
   padding: "12px",
   borderRight: "1px solid #ccc",
   color: theme.palette.text.primary,
   cursor: "pointer",
   "&:hover": {
      color: theme.palette.primary.main,
   },
}));

export const SearchButton = styled(InputAdornment)(({ theme }) => ({
   padding: "18px 12px",
   height: "100%",
   marginRight: 12,
   backgroundColor: theme.palette.primary.main,
   border: 1,
   borderRadius: 2,
   cursor: "pointer",
   color: theme.palette.white.main,
   "&:hover": {
      opacity: 0.6,
   },
}));
