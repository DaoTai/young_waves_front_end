import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { NavLink } from "../../../../components";
const Navigation = ({ home }: { home: string }) => {
   return (
      <Stack flexDirection="row" alignItems="base-line" p={2} sx={{ gap: 6 }}>
         <NavLink to={home}>Post</NavLink>
         <NavLink to="/">Images</NavLink>
      </Stack>
   );
};

export default Navigation;
