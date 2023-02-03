import { Box, Card, CardContent, Typography } from "@mui/material";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
const News = () => {
   return (
      <>
         <Box>
            <Card>
               {/* Heading */}
               <Heading />
               {/* Images */}
               <Images />
               {/* Body */}
               <CardContent>
                  <Typography variant="body2" color="text.secondary">
                     Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                     ranging across all continents except Antarctica
                  </Typography>
               </CardContent>
               {/* Actions */}
               <Actions />
            </Card>
         </Box>
      </>
   );
};

export default News;
