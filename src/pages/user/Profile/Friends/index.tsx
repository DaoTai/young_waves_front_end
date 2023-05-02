import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Avatar,
   Box,
   Button,
   Grid,
   Menu,
   MenuItem,
   Pagination,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../../../apis";
import { Dialog, BaseInput as Search, Spinner } from "../../../../components";
import { useDebounce } from "../../../../hooks";
import { cancelFriend } from "../../../../redux-saga/redux/actions";
import { Profile } from "../../../../utils/interfaces/Profile";
import { ClearButton, SearchButton } from "../../Explore/styles";
import { useSelector } from "react-redux";
import { authState$ } from "../../../../redux-saga/redux/selectors";
const Friends = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const auth$ = useSelector(authState$);
   const [loading, setLoading] = useState<boolean>(true);
   const [friends, setFriends] = useState<Profile[] | []>([]);
   const [idFriend, setIdFriend] = useState<string | null>(null);
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [openDialogUnfriend, setOpenDialogUnfriend] = useState<boolean>(false);
   const [page, setPage] = useState<number>(1);
   const [value, setValue] = useState<string>("");
   const maxPageRef = useRef(0);
   const searchDebounce = useDebounce(value, 1000);

   const openMenu = Boolean(anchorEl);

   useEffect(() => {
      (async () => {
         try {
            let res;
            if (searchDebounce) {
               res = await api.user.getFriends(auth$.payload?.user?._id, page, searchDebounce);
            } else {
               res = await api.user.getFriends(auth$.payload?.user?._id, page);
            }
            setLoading(false);
            setFriends(res.data?.friends);
            maxPageRef.current = res?.data?.maxPage;
            console.log("res = ", res);
         } catch (err: any) {
            throw new Error(err);
         }
      })();
   }, [searchDebounce, page]);

   // Search friends
   const handleClearSearch = () => {
      if (value) {
         setValue("");
         setFriends([]);
      }
   };
   // Change page
   const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
   };
   // Show menu
   const handleShowMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
      setAnchorEl(event.currentTarget);
      setIdFriend(id);
   };
   // Close menu actions
   const onCloseMenuActions = () => {
      setAnchorEl(null);
   };

   const onOpenDialogUnfriend = () => {
      setOpenDialogUnfriend(true);
      onCloseMenuActions();
   };

   // Close dialog unfriend
   const onCloseDialogUnfriend = () => {
      setOpenDialogUnfriend(false);
      onCloseMenuActions();
   };

   // Navigate to profile user
   const goToProfile = (id: string) => {
      navigate("/user/explore/" + id);
   };

   // Copy link friend
   const handleCopyLinkFriend = () => {
      navigator.clipboard.writeText(`${window.location.origin}/user/explore/${idFriend}`);
      onCloseMenuActions();
   };

   // Handle Unfriend
   const handleUnfriend = async () => {
      dispatch(cancelFriend(idFriend as string));
      setFriends((prev) => prev.filter((friend) => friend._id !== idFriend));
      onCloseDialogUnfriend();
      onCloseMenuActions();
   };
   return (
      <>
         <Box>
            <Search
               fullWidth
               autoComplete="off"
               value={value}
               spellCheck={false}
               placeholder="Search..."
               sx={{
                  border: 1,
                  borderColor: theme.myColor.textSecondary,
                  bgcolor: theme.myColor.white,
                  borderRadius: 2,
               }}
               endAdornment={
                  <Stack flexDirection="row" alignItems="center">
                     {value && (
                        <ClearButton position="end" onClick={handleClearSearch}>
                           <CloseIcon />
                        </ClearButton>
                     )}
                     <SearchButton position="end">
                        <SearchIcon />
                     </SearchButton>
                  </Stack>
               }
               onChange={(e) => setValue(e.target.value)}
            />
            {friends.length > 0 ? (
               <Grid
                  container
                  mt={1}
                  justifyContent="space-between"
                  overflow="hidden"
                  sx={{ padding: "0 4px" }}>
                  {friends.map((friend: Profile, index) => (
                     <Grid
                        key={friend._id}
                        item
                        sm={6}
                        xs={12}
                        flexDirection="row"
                        gap={2}
                        p={1}
                        boxShadow={2}
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        bgcolor={theme.myColor.white}
                        sx={{ margin: "4px -4px" }}>
                        {/* Avatar */}

                        <Avatar
                           variant="square"
                           src={friend.avatar}
                           onClick={() => goToProfile(friend._id)}
                           sx={{
                              width: 80,
                              height: 80,
                              borderRadius: 2,
                              objectFit: "cover",
                              cursor: "pointer",
                           }}
                        />
                        {/* Fullname */}
                        <Typography
                           flex={2}
                           variant="body1"
                           sx={{ cursor: "pointer" }}
                           onClick={() => goToProfile(friend._id)}>
                           {friend.fullName}
                        </Typography>
                        {/* Action button*/}
                        <Button
                           aria-controls={openMenu ? "basic-menu" : undefined}
                           aria-haspopup="true"
                           aria-expanded={openMenu ? "true" : undefined}
                           sx={{
                              bgcolor: theme.myColor.white,
                              justifyContent: "center",
                              "&:hover": {
                                 bgcolor: "transparent",
                                 opacity: 0.8,
                              },
                           }}
                           onClick={(e) => handleShowMenu(e, friend._id)}>
                           <MoreHorizIcon />
                        </Button>
                     </Grid>
                  ))}
               </Grid>
            ) : (
               <Typography
                  variant="subtitle1"
                  textAlign="center"
                  p={2}
                  letterSpacing={2}
                  fontSize={18}>
                  No friend <br />
                  <Link to="/user/explore">Let's add friends</Link>
               </Typography>
            )}

            {/* Menu actions*/}
            <Menu
               anchorEl={anchorEl}
               open={openMenu}
               onClose={onCloseMenuActions}
               MenuListProps={{
                  "aria-labelledby": "basic-button",
               }}
               sx={{
                  ".MuiButtonBase-root": {
                     justifyContent: "space-between",
                     gap: 1,
                  },
               }}>
               <MenuItem divider onClick={() => navigate("/user/explore/" + idFriend)}>
                  <Typography variant="body1" component="span">
                     Explore
                  </Typography>
                  <VisibilityIcon />
               </MenuItem>
               <MenuItem divider onClick={handleCopyLinkFriend}>
                  <Typography variant="body1" component="span">
                     Copy link
                  </Typography>
                  <ContentCopyIcon />
               </MenuItem>
               <MenuItem divider onClick={onOpenDialogUnfriend}>
                  <Typography variant="body1" component="span">
                     Unfriend
                  </Typography>
                  <PersonRemoveIcon />
               </MenuItem>
            </Menu>

            {/* Pagination */}
            <Pagination
               count={maxPageRef.current}
               variant="outlined"
               color="primary"
               onChange={(event: ChangeEvent<unknown>, page: number) =>
                  handleChangePage(event, page)
               }
               sx={{ display: "flex", justifyContent: "center", m: 4 }}
            />
         </Box>

         {/* Dialog */}
         <Dialog
            open={openDialogUnfriend}
            title="Confirm unfriend"
            content="Are you sure to calcel this friend?"
            onClose={onCloseDialogUnfriend}
            onSubmit={handleUnfriend}
         />

         <Spinner show={loading} />
      </>
   );
};

export default Friends;
