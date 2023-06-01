import ExploreIcon from "@mui/icons-material/Explore";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PublicIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, CardContent, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { MyCard, WrapButtons } from "./style";
import { addFriend } from "../../../../redux-saga/redux/actions";
import { Dialog } from "../../../../components";
import { useState } from "react";
const Card = ({ user }: { user: Profile }) => {
   const auth$ = useSelector(authState$);
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const isFriend = auth$.payload.user.friends.includes(user._id);

   const onCloseDialog = () => setOpenDialog(!openDialog);

   const handleAddFriend = async () => {
      dispatch(addFriend(user._id));
   };

   return (
      <MyCard boxShadow={1} borderRadius={1} bgcolor={theme.myColor.white} overflow="hidden">
         <CardContent>
            <Avatar
               alt="avatar"
               src={user.avatar}
               srcSet={user.avatar}
               sx={{ border: "1px dashed #ccc", margin: "0 auto", width: 200, height: 200 }}
            />
            <Stack mt={2} gap={1}>
               <Divider />
               <Stack flexDirection="row" alignItems="center" gap={1}>
                  {user?.isAdmin ? (
                     <AdminPanelSettingsIcon color="success" />
                  ) : (
                     <PersonIcon color="primary" />
                  )}
                  <Typography variant="body1" component="span" m={0}>
                     {user?.fullName}
                  </Typography>
               </Stack>
               <Stack
                  flexDirection="row"
                  alignItems="center"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  gap={1}>
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
            <WrapButtons>
               <Button
                  className="btn"
                  variant="contained"
                  onClick={() => navigate(`${user?._id}`)}
                  startIcon={<ExploreIcon fontSize="large" />}>
                  Watch
               </Button>
               <Button
                  className={"btn btn--add-friend" + " " + (isFriend ? "hide" : "")}
                  variant="contained"
                  onClick={() => setOpenDialog(!openDialog)}
                  startIcon={<AddIcon fontSize="large" />}>
                  Add friend
               </Button>
            </WrapButtons>
         </CardContent>
         <Dialog
            open={openDialog}
            title="Friend"
            content={"Do u want to add friend with " + user.fullName}
            onClose={onCloseDialog}
            onSubmit={handleAddFriend}
         />
      </MyCard>
   );
};

export default Card;
