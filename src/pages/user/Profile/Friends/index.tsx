import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as api from "../../../../apis";
import { BaseInput as Search } from "../../../../components";
import { useDebounce } from "../../../../hooks";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { ClearButton, SearchButton } from "../../Explore/styles";
const Friends = () => {
   const { payload } = useSelector(profileState$);
   const theme = useTheme();
   const [friends, setFriends] = useState<Profile[] | []>([]);
   const [page, setPage] = useState<number>(1);
   const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
   const [value, setValue] = useState<string>("");
   const searchDebounce = useDebounce(value);
   useEffect(() => {
      (async () => {
         const res = await api.user.getFriends(payload._id, page);
         if (res.status === 200) {
            setFriends((prev) => {
               return [...prev, ...res.data.friends];
            });
            page === res.data.maxPage && setShowLoadMore(false);
         }
      })();
   }, [page]);
   return (
      <Box>
         <Search
            fullWidth
            autoComplete="off"
            value={value}
            spellCheck={false}
            placeholder="Search..."
            sx={{ border: 1, borderColor: theme.myColor.textSecondary }}
            endAdornment={
               <Stack flexDirection="row" alignItems="center">
                  <ClearButton position="end">
                     <CloseIcon />
                  </ClearButton>
                  <SearchButton position="end">
                     <SearchIcon />
                  </SearchButton>
               </Stack>
            }
            onChange={(e) => setValue(e.target.value)}
         />
         {friends.length > 0 ? (
            <>
               <Stack mt={1} gap={1} flexDirection="row" flexWrap="wrap">
                  {friends.map((friend: Profile) => (
                     <Stack
                        key={friend._id}
                        flexDirection="row"
                        gap={2}
                        p={2}
                        boxShadow={2}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{
                           width: "calc(50% - 4px)",
                        }}>
                        <Link to="/">
                           <Avatar
                              variant="square"
                              src={friend.avatar}
                              sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover" }}
                           />
                        </Link>
                        <Typography flex={2} variant="body1">
                           <Link to="/" style={{ color: theme.myColor.text }}>
                              {friend.fullName}
                           </Link>
                        </Typography>
                        <MoreHorizIcon />
                     </Stack>
                  ))}
               </Stack>

               {showLoadMore && (
                  <Button
                     variant="outlined"
                     sx={{ display: "block", margin: "16px auto" }}
                     onClick={() => setPage((prev) => prev + 1)}>
                     Load more
                  </Button>
               )}
            </>
         ) : (
            <Typography>No friend</Typography>
         )}
      </Box>
   );
};

export default Friends;
