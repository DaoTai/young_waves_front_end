import { Close as CloseIcon } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Modal, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Profile } from "../../../../../../utils/interfaces/Profile";
import AddFriendBtn from "../../../../Explore/Card/AddFriendButton";

interface Props {
   open: boolean;
   users: Partial<Profile>[];
   onClose: () => void;
}

const ListLikes = ({ open, users, onClose }: Props) => {
   const theme = useTheme();
   return (
      <Modal open={open} onClose={onClose}>
         <Box
            p={2}
            borderRadius={1}
            position="absolute"
            top="50%"
            left="50%"
            minWidth="40vw"
            maxWidth="70vw"
            boxShadow={1}
            bgcolor={theme.palette.white.main}
            sx={{ transform: "translate(-50%,-50%)" }}>
            <Stack flexDirection="row" alignItems="center" pb={1}>
               <Typography flex={2} variant="h4" textAlign="center">
                  Likes
               </Typography>
               <Button variant="outlined" sx={{ bgcolor: theme.palette.white.main }} onClick={onClose}>
                  <CloseIcon />
               </Button>
            </Stack>
            <Divider />
            <Stack pt={2} maxHeight="70vh" gap={2}>
               {users.map((user) => (
                  <Stack key={user._id} p={1} boxShadow={2} flexDirection="row" alignItems="center">
                     <Box flex={2} display="flex" alignItems="center" gap={2}>
                        <Avatar src={user.avatar} sx={{ width: 52, height: 52 }} />
                        <Link to={"/user/explore/" + user._id}>
                           <Typography variant="body1">{user.fullName}</Typography>
                        </Link>
                     </Box>
                     <AddFriendBtn idUser={user._id} fullName={user.fullName} />
                  </Stack>
               ))}
            </Stack>
         </Box>
      </Modal>
   );
};

export default ListLikes;
