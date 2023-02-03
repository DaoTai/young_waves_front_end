import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { NavLink } from "../../../../components";
const Navigation = () => {
   return (
      <Stack flexDirection="row" alignItems="base-line" p={2} sx={{ gap: 6 }}>
         <NavLink to="/">Post</NavLink>
         <NavLink to="/">Images</NavLink>
      </Stack>
   );
};

export default Navigation;
