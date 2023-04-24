import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import {
   Button,
   Divider,
   Fab,
   List,
   ListItem,
   Stack,
   Tooltip,
   Typography,
   useTheme,
} from "@mui/material";
import { WrapFeatures } from "./style";
import { TYPE_FEATURES } from "../../../utils/types";
import { FEATURES_ADMIN } from "../../../utils/enums";
const Features = ({ onClick }: { onClick: (name: TYPE_FEATURES) => void }) => {
   const theme = useTheme();
   const items = [
      { name: FEATURES_ADMIN.users, label: "Users", Icon: <PeopleAltIcon /> },
      // { name: FEATURES_ADMIN.statistical, label: "Statistical", Icon: <EqualizerIcon /> },
      { name: FEATURES_ADMIN.trashes, label: "Trashes", Icon: <RestoreFromTrashIcon /> },
   ];

   return (
      <Stack
         gap={2}
         spacing={1}
         p={1}
         sx={{
            borderTopLeftRadius: 99,
            borderTopRightRadius: 99,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            background: "linear-gradient(to top, #667db6, #0082c8, #0082c8, #667db6)",
         }}
         boxShadow={2}>
         {items.map((item, index) => (
            <Fab
               key={index}
               size="medium"
               onClick={() => onClick(item.name)}
               sx={{
                  bgcolor: theme.myColor.link,
                  color: theme.myColor.white,
                  border: 1,
                  transition: "all 0.3s linear",
                  "&:hover": {
                     color: theme.myColor.link,
                     bgcolor: theme.myColor.white,
                     borderColor: theme.myColor.link,
                     transform: "scale(1.1)",
                  },
               }}>
               {item.Icon}
            </Fab>
         ))}
      </Stack>
   );
};

export default Features;
