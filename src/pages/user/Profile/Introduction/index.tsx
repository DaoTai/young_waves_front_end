import CakeIcon from "@mui/icons-material/Cake";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import { memo } from "react";
import { Box, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import dateFormat from "dateformat";
import { Profile } from "../../../../utils/interfaces/Profile";
const Introduction = ({ user }: { user: Partial<Profile> }) => {
   const theme = useTheme();
   return (
      <Box p={1} mb={1} boxShadow={1} borderRadius={1} bgcolor={theme.myColor.white}>
         <Typography variant="h5" textAlign="center" p={1} borderBottom={1}>
            Introduction
         </Typography>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <Tooltip title="Date of birth" placement="left" arrow>
               <CakeIcon />
            </Tooltip>
            <Typography variant="body1" component="b" pl={1}>
               {user?.dob}
            </Typography>
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <Tooltip title="Time joined" placement="left" arrow>
               <HandshakeIcon />
            </Tooltip>
            <Typography variant="body1" component="b" pl={1}>
               {dateFormat(user?.createdAt, " mmmm dS, yyyy")}
            </Typography>
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <Tooltip title="City" placement="left" arrow>
               <LocationOnIcon />
            </Tooltip>
            <Typography variant="body1" component="b" pl={1}>
               {user?.city} city
            </Typography>
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <Tooltip title="Region" placement="left" arrow>
               <PublicIcon />
            </Tooltip>
            <Typography variant="body1" component="b" pl={1}>
               {user?.region}
            </Typography>
         </Stack>
      </Box>
   );
};

export default memo(Introduction);
