import { Box, Container, Grid, Pagination, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState, useEffect, useMemo, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import Search from "./Search";
import { usersState$, signInState$ } from "../../../redux-saga/redux/selectors";
import { getAllUser } from "../../../redux-saga/redux/actions";
import Card from "./Card";
import { Profile } from "../../../utils/interfaces/Profile";
import { TYPE_SEARCH } from "../../../utils/types";

const Explore = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(usersState$);
   const {
      payload: { data },
   } = useSelector(signInState$);
   const idUser = data?.payload?._id;
   const { users, currentPage, maxPage } =
      (payload as {
         users: Profile[];
         currentPage: number;
         maxPage: number;
      }) ?? {};
   const [tab, setTab] = useState<TYPE_SEARCH>("users");
   const [page, setPage] = useState<number>(1);

   const otherUsers = useMemo<Profile[]>(() => {
      return users?.filter((user) => user._id !== idUser);
   }, [users]);
   useEffect(() => {
      if (tab === "users") {
         dispatch(getAllUser({ page }));
      }
      if (tab === "posts") {
         console.log("hi");
      }
   }, [page, tab]);

   const handleChangeTabPanel = (event: React.SyntheticEvent, newValue: TYPE_SEARCH) => {
      setTab(newValue);
   };

   // Content for each tab
   const InforExplore: Record<TYPE_SEARCH, React.ReactNode> = {
      users: (
         <>
            {otherUsers?.length > 0 ? (
               otherUsers?.map((user) => {
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
         </>
      ),
      posts: (
         <Grid item xs={12}>
            Hello
         </Grid>
      ),
   };

   // Pagination for each tab
   const PaginationExplore: Record<TYPE_SEARCH, React.ReactNode> = {
      users: (
         <>
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
         <Grid item xs={12}>
            Hello
         </Grid>
      ),
   };

   const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
      setPage(page);
   };

   return (
      <>
         <Helmet>
            <title>Explore | Young Waves</title>
         </Helmet>
         <Container maxWidth="xl">
            <Search />
            {/* Category options */}
            <Tabs value={tab} sx={{ m: 2 }} onChange={handleChangeTabPanel}>
               <Tab value="users" label="Users" />
               <Tab value="posts" label="Posts" />
            </Tabs>
            {/* Tab panel */}
            <Grid container spacing={2} mt={2} alignItems="stretch">
               {InforExplore[tab]}
            </Grid>

            {/* Pagination */}
            {PaginationExplore[tab]}
         </Container>
      </>
   );
};

export default Explore;
