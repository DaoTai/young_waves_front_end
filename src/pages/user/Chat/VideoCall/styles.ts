import { Grid, Paper, makeStyles, styled } from "@mui/material";

export const Container = styled(Paper)(({ theme }) => ({
  padding: 12,
  overflow: "auto",
  backgroundColor: theme.palette.white.main,
  borderRadius: 8,
}));
