import { Container, Grid, Pagination, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, BaseInput as MySearch } from "../../../components";
import { getAllUser } from "../../../redux-saga/redux/actions";
import { usersState$ } from "../../../redux-saga/redux/selectors";
import { Post } from "../../../utils/interfaces/Post";
import { Profile } from "../../../utils/interfaces/Profile";
import { TYPE_SEARCH } from "../../../utils/types";
import { searchPosts } from "../../../apis/post";
import Card from "./Card";
import { ClearButton, SearchButton } from "./styles";
import News from "../NewsFeed/News";

const Explore = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(usersState$);
   const { users, currentPage, maxPage } =
      (payload as {
         users: Profile[];
         currentPage: number;
         maxPage: number;
      }) ?? {};
   const [tab, setTab] = useState<TYPE_SEARCH>("users");
   const [page, setPage] = useState<number>(1);
   const [posts, setPosts] = useState<Post[]>([]);
   const [search, setSearch] = useState<string>("");
   useEffect(() => {
      // When search value is empty

      if (tab === "users") {
         // Exist search value
         if (search.trim()) {
            dispatch(getAllUser({ name: search.trim(), page }));
         } else {
            dispatch(getAllUser({ page }));
         }
      }
      if (tab === "posts") {
         if (search.trim()) {
            (async () => {
               const res = await searchPosts(search);
               res.status === 200 && setPosts(res.data);
            })();
         } else {
            setPosts([]);
         }
      }
   }, [page, tab]);

   const handleChangeTabPanel = (event: React.SyntheticEvent, newValue: TYPE_SEARCH) => {
      setTab(newValue);
   };

   const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
   };

   // Do search
   const handleSearch = () => {
      if (search.trim()) {
         if (tab === "users") {
            dispatch(getAllUser({ name: search.trim() }));
         }
         if (tab === "posts") {
            (async () => {
               const res = await searchPosts(search);
               res.status === 200 && setPosts(res.data);
            })();
         }
      }
   };

   // Clear search value
   const handleClear = () => {
      if (search.trim()) {
         setSearch("");
         setPosts([]);
         if (tab === "users") {
            dispatch(getAllUser());
         }
      }
   };

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };

   const onKeyDown = (e: React.KeyboardEvent) => {
      e.which === 13 && search.trim() && handleSearch();
   };

   // Content for each tab
   const InforExplore: Record<TYPE_SEARCH, React.ReactNode> = {
      users: (
         <>
            {/* Information search */}
            <Grid container spacing={2} mt={2} alignItems="stretch">
               {users?.length > 0 ? (
                  users?.map((user) => {
                     return (
                        <Grid key={user._id} item lg={4} md={4} xs={12}>
                           <Card user={user} />
                        </Grid>
                     );
                  })
               ) : (
                  <Grid item xs={12} padding={2}>
                     <Typography textAlign="center">No exist user</Typography>
                  </Grid>
               )}
            </Grid>
            {/* Pagination */}
            <Pagination
               count={maxPage}
               variant="outlined"
               color="primary"
               onChange={(event: ChangeEvent<unknown>, page: number) =>
                  handleChangePage(event, page)
               }
               sx={{ display: "flex", justifyContent: "center", m: 4 }}
            />
         </>
      ),
      posts: (
         <Stack sx={{ gap: 1 }} flexDirection="column">
            <News listNews={posts} />
         </Stack>
      ),
   };

   return (
      <>
         <Helmet>
            <title>Explore | Young Waves</title>
         </Helmet>
         <Container maxWidth="xl">
            {/* Search */}
            <MySearch
               fullWidth
               value={search}
               spellCheck={false}
               placeholder="Search..."
               sx={{
                  border: 1,
                  borderColor: theme.myColor.textSecondary,
                  borderRadius: 12,
                  p: 1,
                  pl: 2,
               }}
               endAdornment={
                  <Stack flexDirection="row" alignItems="center">
                     <ClearButton position="end" onClick={handleClear}>
                        <CloseIcon />
                     </ClearButton>
                     <SearchButton position="end" onClick={handleSearch}>
                        <SearchIcon />
                     </SearchButton>
                  </Stack>
               }
               onChange={onChange}
               onKeyDown={onKeyDown}
            />
            {/* Category options */}
            <Tabs
               value={tab}
               sx={{ mt: 2, mb: 2, bgcolor: theme.myColor.white }}
               onChange={handleChangeTabPanel}>
               <Tab value="users" label="Users" />
               <Tab value="posts" label="Posts" />
            </Tabs>
            {/* Tab panel */}
            {InforExplore[tab]}
         </Container>

         {/* <Spinner show={isLoading} /> */}
      </>
   );
};

export default Explore;
