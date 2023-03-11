import { useState } from "react";
import { Tabs, Tab, Typography, Box, Paper } from "@mui/material";
import UserTrashes from "./Users";
import { TYPE_TRASHES } from "../../../utils/types";
const Trashes = () => {
   const [trash, setTrash] = useState<TYPE_TRASHES>("users");
   const TypeTrash: Record<TYPE_TRASHES, React.ReactNode> = {
      users: <UserTrashes />,
   };
   const handleChangeTabPanel = (event: React.SyntheticEvent, newValue: TYPE_TRASHES) => {
      setTrash(newValue);
   };
   return (
      <>
         <Typography variant="h3" textAlign="center">
            Trashes
         </Typography>

         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={trash} onChange={handleChangeTabPanel}>
               <Tab value="users" label="Users" />
            </Tabs>
         </Box>

         <Box>{TypeTrash[trash]}</Box>
      </>
   );
};

export default Trashes;
