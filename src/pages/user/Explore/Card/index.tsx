import ExploreIcon from "@mui/icons-material/Explore";
import FemaleIcon from "@mui/icons-material/Face2";
import MaleIcon from "@mui/icons-material/Man";
import PublicIcon from "@mui/icons-material/Public";
import { Button, CardContent, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Image } from "../../../../components";
import { Profile } from "../../../../utils/interfaces/Profile";
import { MyCard } from "./style";
const User = ({ user }: { user: Profile }) => {
   const theme = useTheme();

   return (
      <MyCard boxShadow={1} borderRadius={4} bgcolor={theme.myColor.white} overflow="hidden">
         <CardContent>
            <Image
               src={user.avatar}
               srcSet={user.avatar}
               objectFit="cover"
               circle
               height="280px"
               width="280px"
               border="1px dashed #ccc"
               alt="avatar"
            />
            <Stack gap={2}>
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
