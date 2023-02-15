import { Grid } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersState$, signInState$ } from "../../../redux-saga/redux/selectors";
import { getAllUser } from "../../../redux-saga/redux/actions";
import Card from "./Card";
import { Profile } from "../../../utils/interfaces/Profile";
import { Helmet } from "react-helmet-async";

const Explore = () => {
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(usersState$);
   const {
      payload: { data },
   } = useSelector(signInState$);
   const idUser = data?.payload?._id;
   const { users, currentPage, maxPage } = payload as {
      users: Profile[];
      currentPage: number;
      maxPage: number;
   };
   const anonymouses = useMemo<Profile[]>(() => {
      return users?.filter((user) => user._id !== idUser);
   }, [users]);
   useEffect(() => {
      dispatch(getAllUser());
   }, []);
   return (
      <>
         <Helmet>
            <title>Explore | Young Waves</title>
         </Helmet>
         <Grid container spacing={2} alignItems="stretch">
            {anonymouses?.map((user) => {
               return (
                  <Grid key={user._id} item lg={4} md={4} xs={12}>
                     <Card user={user} />
                  </Grid>
               );
            })}
         </Grid>
      </>
   );
};

export default Explore;
