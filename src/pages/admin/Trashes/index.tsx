import { useState } from "react";
import { Tabs, Tab, Typography, Box, useTheme } from "@mui/material";
import Members from "./Members";
import { TYPE_TRASHES } from "../../../utils/types";
const Trashes = () => {
   const theme = useTheme();
   const [trash, setTrash] = useState<TYPE_TRASHES>("members");
   const TypeTrash: Record<TYPE_TRASHES, React.ReactNode> = {
      members: <Members />,
   };
   const handleChangeTabPanel = (event: React.SyntheticEvent, newValue: TYPE_TRASHES) => {
      setTrash(newValue);
   };
   return (
      <>
         <Typography
            variant="gradient"
            component="h1"
            fontSize={42}
            fontWeight={500}
            textAlign="center">
            Trashes
         </Typography>

         {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={trash} onChange={handleChangeTabPanel}>
               <Tab
                  value="members"
                  label="Members"
                  sx={{
                     transition: "all 0.3s ease",
                     "&:hover": {
                        bgcolor: theme.palette.background.defaultGray,
                     },
                  }}
               />
            </Tabs>
         </Box> */}

         <Box>{TypeTrash[trash]}</Box>
      </>
   );
};

export default Trashes;
