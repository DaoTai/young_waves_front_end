import ExploreIcon from "@mui/icons-material/Explore";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Button, CardContent, Stack, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Profile } from "../../../../utils/interfaces/Profile";
import { MyCard } from "./style";
const User = ({ user }: { user: Profile }) => {
   const theme = useTheme();
   const navigate = useNavigate();
   return (
      <MyCard boxShadow={1} borderRadius={1} bgcolor={theme.myColor.white} overflow="hidden">
         <CardContent>
            <Avatar
               src={user.avatar}
               srcSet={user.avatar}
               alt="avatar"
               sx={{ border: "1px dashed #ccc", margin: "0 auto", width: 240, height: 240 }}
            />
            <Stack mt={2} gap={1}>
               <Stack flexDirection="row" alignItems="center" gap={1}>
                  {user?.gender.toLowerCase() === "male" ? <MaleIcon /> : <FemaleIcon />}
                  <Typography variant="body1" component="span" m={0}>
                     {user?.fullName}
                  </Typography>
               </Stack>
               <Stack flexDirection="row" alignItems="center" gap={1}>
                  <PublicIcon />
                  <Typography variant="body1" component="span" m={0}>
                     {user?.city},
                  </Typography>
                  <Typography variant="body1" component="span" m={0}>
                     {user?.region}
                  </Typography>
               </Stack>

               <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate(`${user?._id}`)}
                  startIcon={<ExploreIcon fontSize="large" sx={{ transform: "scale(1.2)" }} />}
                  sx={{
                     p: 1,
                     color: theme.myColor.white,
                     transition: "all 0.3 linear",
                     "&:hover": {
                        color: theme.myColor.link,
                        ".MuiTypography-root": {
                           color: theme.myColor.link,
                        },
                     },
                  }}>
                  <Typography
                     variant="body1"
                     sx={{
                        color: theme.myColor.white,
                     }}>
                     Explore
                  </Typography>
               </Button>
            </Stack>
         </CardContent>
      </MyCard>
   );
};

export default User;
