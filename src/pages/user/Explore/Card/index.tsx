import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExploreIcon from "@mui/icons-material/Explore";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Box, Button, CardContent, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../../../utils/interfaces/Profile";
import AddFriendButton from "./AddFriendButton";
const Card = ({ user }: { user: Profile }) => {
   const theme = useTheme();
   const navigate = useNavigate();

   return (
      <Box
         sx={{
            transition: "0.3s linear all",
            "&:hover": {
               filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.2))",
            },
         }}
         boxShadow={1}
         borderRadius={1}
         bgcolor={theme.palette.white.main}
         overflow="hidden">
         <CardContent>
            <Avatar alt="avatar" src={user.avatar} srcSet={user.avatar} sx={{ margin: "0 auto", width: 200, height: 200 }} />
            <Stack mt={2} gap={1}>
               <Divider />
               <Stack flexDirection="row" alignItems="center" gap={1}>
                  {user?.isAdmin ? <AdminPanelSettingsIcon color="warning" /> : <PersonIcon color="primary" />}
                  <Typography variant="body1" component="span" m={0}>
                     {user?.fullName}
                  </Typography>
               </Stack>
               <Stack flexDirection="row" alignItems="center" textOverflow="ellipsis" overflow="hidden" gap={1}>
                  <LocationCityIcon color="primary" />
                  <Typography variant="body1" component="span" m={0}>
                     {user?.city}
                  </Typography>
               </Stack>
               <Stack
                  flexDirection="row"
                  alignItems="center"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="pre"
                  gap={1}>
                  <PublicIcon color="primary" />
                  <Typography variant="body1" component="span" m={0}>
                     {user?.region}
                  </Typography>
               </Stack>
            </Stack>

            {/* Buttons */}
            <Stack gap={2} mt={2} flexDirection="row" flexWrap="wrap">
               <Button
                  sx={{
                     color: theme.palette.white.main,
                     fontWeight: 400,
                     textOverflow: "clip",
                     whiteSpace: "pre",
                     overflow: "hidden",
                     height: "100%",
                     flex: 1,
                  }}
                  variant="contained"
                  onClick={() => navigate(`${user?._id}`)}
                  startIcon={<ExploreIcon fontSize="large" />}>
                  Watch
               </Button>
               {/* Add friend */}
               <AddFriendButton idUser={user._id} fullName={user.fullName} />
            </Stack>
         </CardContent>
      </Box>
   );
};

export default Card;
