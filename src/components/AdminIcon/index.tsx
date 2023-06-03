import { Tooltip, SvgIconProps } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import React from "react";

const AdminIcon = (props: SvgIconProps) => {
   return (
      <Tooltip title="Admin">
         <AdminPanelSettingsIcon {...props} color="warning" />
      </Tooltip>
   );
};

export default AdminIcon;
