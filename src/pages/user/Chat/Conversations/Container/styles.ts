import { ButtonBase, Stack, styled } from "@mui/material";

export const ClearButton = styled(ButtonBase)(({ theme }) => ({
   bgcolor: "transparent",
   padding: 8,
   transition: "all 0.3s linear",
   "&:hover": { opacity: 0.6 },
}));

export const ConvItem = styled(Stack)(({ theme }) => ({
   flexDirection: "row",
   alignItems: "center",
   padding: "8px",
   borderRadius: "4px",
   boxShadow: "0px 0px 4px rgba(0,0,0,0.2)",
   gap: 8,
   cursor: "pointer",
   "&:hover": {
      backgroundColor: theme.myColor.bgGray,
   },
}));
