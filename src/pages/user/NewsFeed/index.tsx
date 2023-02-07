import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import News from "./News";
import { Post } from "../../../components";
import Weather from "./Weather";
const NewsFeed = () => {
   return (
      <>
         <Stack direction="column" sx={{ gap: 4 }}>
            {/* <Weather /> */}
            <Post />
            <News />
         </Stack>
         <Outlet />
      </>
   );
};

export default NewsFeed;
