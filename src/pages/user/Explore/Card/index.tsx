import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ExploreIcon from "@mui/icons-material/Explore";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Button, CardContent, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Image } from "../../../../components";
import { Profile } from "../../../../utils/interfaces/Profile";
import { MyCard } from "./style";
const User = ({ user }: { user: Profile }) => {
   const theme = useTheme();
   return (
      <MyCard boxShadow={1} borderRadius={4} bgcolor={theme.myColor.white} overflow="hidden">
         <Image src={user.avatar} objectFit="cover" height="260px" width="100%" alt="avatar" />
         <CardContent sx={{ borderTop: 1 }}>
            <Stack gap={2}>
               <Stack flexDirection="row" alignItems="center" gap={1}>
                  <AccessibilityIcon />
                  <Typography variant="body1" component="span" m={0}>
                     {user?.fullName}
                  </Typography>
               </Stack>
               <Stack flexDirection="row" alignItems="center" gap={1}>
                  <PublicIcon />
                  <Typography variant="body1" component="span" m={0}>
                     {user?.region}
                  </Typography>
               </Stack>

               <Link to={`${user?._id}`}>
                  <Button fullWidth variant="outlined" startIcon={<ExploreIcon />} sx={{ p: 1 }}>
                     <Typography variant="body1">Explore</Typography>
                  </Button>
               </Link>
            </Stack>
         </CardContent>
      </MyCard>
   );
};

export default User;
