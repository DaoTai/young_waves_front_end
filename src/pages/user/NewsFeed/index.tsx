import { Stack } from "@mui/system";
import News from "./News";
import { Post } from "../../../components";
import Weather from "./Weather";
const NewsFeed = () => {
   return (
      <Stack direction="column" sx={{ gap: 4 }}>
         <Weather />
         <Post />
         <News />
      </Stack>
   );
};

export default NewsFeed;
