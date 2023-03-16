import ExploreIcon from "@mui/icons-material/Explore";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import PublicIcon from "@mui/icons-material/Public";
import { Avatar, Button, CardContent, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Profile } from "../../../../utils/interfaces/Profile";
import { MyCard } from "./style";
const User = ({ user }: { user: Profile }) => {
   const theme = useTheme();

   return (
      <MyCard boxShadow={1} borderRadius={4} bgcolor={theme.myColor.white} overflow="hidden">
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

               <Link to={`${user?._id}`}>
                  <Button
                     fullWidth
                     variant="outlined"
                     startIcon={<ExploreIcon />}
                     sx={{
                        p: 1,
                        color: theme.myColor.white,
                        transition: "all 0.3 linear",

                        "&:hover": {
                           color: theme.myColor.text,
                           ".css-uilowj-MuiTypography-root": {
                              color: theme.myColor.text,
                           },
                        },
                     }}>
                     <Typography
                        variant="body1"
                        sx={{
                           color: theme.myColor.white,
                           "&:hover": {
                              color: theme.myColor.text,
                           },
                        }}>
                        Explore
                     </Typography>
                  </Button>
               </Link>
            </Stack>
         </CardContent>
      </MyCard>
   );
};

export default User;
