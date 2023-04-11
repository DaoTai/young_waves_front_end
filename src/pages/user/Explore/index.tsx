import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Grid, Pagination, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { searchPosts } from "../../../apis/post";
import { getAllUser } from "../../../apis/user";
import { BaseInput as MySearch } from "../../../components";
import { Post } from "../../../utils/interfaces/Post";
import { Profile } from "../../../utils/interfaces/Profile";
import { TYPE_SEARCH } from "../../../utils/types";
import News from "../NewsFeed/News";
import Card from "./Card";
import { ClearButton, SearchButton } from "./styles";

const Explore = () => {
   const theme = useTheme();
   const exploreRef = useRef<HTMLDivElement>(null);
   const maxPageRef = useRef<number>(0);
   const [tab, setTab] = useState<TYPE_SEARCH>("users");
   const [page, setPage] = useState<number>(1);
   const [users, setUsers] = useState<Profile[]>([]);
   const [posts, setPosts] = useState<Post[]>([]);
   const [search, setSearch] = useState<string>("");
   useEffect(() => {
      // When search value is empty
      exploreRef.current?.scrollIntoView({ behavior: "smooth" });
      if (tab === "users") {
         // Exist search value
         handleGetUnqueriedAllUser();
      }
      if (tab === "posts") {
         if (search.trim()) {
            (async () => {
               const res = await searchPosts(search);
               res.status === 200 && setPosts(res.data as Post[]);
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

   // Get all user has query
   const handleGetQueriedAllUser = async () => {
      const res = await getAllUser({
         name: search.trim(),
      });
      const data: {
         currentPage: number;
         maxPage: number;
         users: Profile[];
      } = res.data;
      maxPageRef.current = data.maxPage;
      setUsers(data.users);
   };

   // Get all user without query
   const handleGetUnqueriedAllUser = async () => {
      const res = await getAllUser();
      const data: {
         currentPage: number;
         maxPage: number;
         users: Profile[];
      } = res.data;
      maxPageRef.current = data.maxPage;
      setUsers(data.users);
   };

   // Do search
   const handleSearch = async () => {
      if (search.trim()) {
         if (tab === "users") {
            handleGetQueriedAllUser();
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
   const handleClear = async () => {
      if (search.trim()) {
         setSearch("");
         setPosts([]);
         if (tab === "users") {
            handleGetUnqueriedAllUser();
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
            <Grid container spacing={2} alignItems="stretch">
               {users?.length > 0 ? (
                  users?.map((user) => {
                     return (
                        <Grid key={user._id} item lg={3} md={3} xs={12}>
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
               count={maxPageRef.current}
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
            <News posts={posts} />
         </Stack>
      ),
   };

   return (
      <>
         <Helmet>
            <title>Explore | Young Waves</title>
         </Helmet>
         <Container maxWidth="xl" ref={exploreRef}>
            {/* Search */}
            <MySearch
               fullWidth
               autoComplete="off"
               value={search}
               spellCheck={false}
               placeholder="Search..."
               sx={{
                  border: 1,
                  mt: 1,
                  borderColor: theme.palette.primary.main,
                  bgcolor: theme.myColor.white,
                  borderRadius: 2,
                  p: 0.5,
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
