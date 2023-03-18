import CakeIcon from "@mui/icons-material/Cake";
import FemaleIcon from "@mui/icons-material/Female";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MaleIcon from "@mui/icons-material/Male";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import dateFormat from "dateformat";
import { memo } from "react";
import { Profile } from "../../../../utils/interfaces/Profile";
const Introduction = ({ user }: { user: Partial<Profile> }) => {
   const theme = useTheme();
   return (
      <Box p={1} mb={1} boxShadow={1} borderRadius={1} bgcolor={theme.myColor.white}>
         <Typography variant="h5" textAlign="center" p={1} borderBottom={1}>
            Introduction
         </Typography>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            {user?.gender?.toLowerCase() !== "other" && (
               <>
                  {user?.gender?.toLowerCase() === "male" ? <MaleIcon /> : <FemaleIcon />}
                  <Typography variant="body1" component="b" pl={1}>
                     {user?.gender?.toUpperCase()}
                  </Typography>
               </>
            )}
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <CakeIcon />
            <Typography variant="body1" component="b" pl={1}>
               {user?.dob}
            </Typography>
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <HandshakeIcon />
            <Typography variant="body1" component="b" pl={1}>
               {dateFormat(user?.createdAt, " mmmm dS, yyyy")}
            </Typography>
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <LocationOnIcon />
            <Typography variant="body1" component="b" pl={1}>
               {user?.city} city
            </Typography>
         </Stack>
         <Stack flexDirection="row" alignItems="center" pt={1} pb={2}>
            <PublicIcon />
            <Typography variant="body1" component="b" pl={1}>
               {user?.region}
            </Typography>
         </Stack>
      </Box>
   );
};

export default memo(Introduction);
