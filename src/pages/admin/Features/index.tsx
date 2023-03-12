import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import { Button, Divider, List, ListItem, Typography, useTheme } from "@mui/material";
import { WrapFeatures } from "./style";
import { TYPE_FEATURES } from "../../../utils/types";
import { FEATURES_ADMIN } from "../../../utils/enums";
const Features = ({ onClick }: { onClick: (name: TYPE_FEATURES) => void }) => {
   const theme = useTheme();
   const items = [
      { name: FEATURES_ADMIN.users, label: "Users", Icon: <PeopleAltIcon /> },
      { name: FEATURES_ADMIN.statistical, label: "Statistical", Icon: <EqualizerIcon /> },
      { name: FEATURES_ADMIN.addMember, label: "Add member", Icon: <GroupAddIcon /> },
      { name: FEATURES_ADMIN.trashes, label: "Trashes", Icon: <RestoreFromTrashIcon /> },
   ];

   return (
      <WrapFeatures>
         <Typography variant="h4" textAlign="center" color="#fff">
            Admin
         </Typography>
         <Divider />
         {/* List item */}
         {items.map((item, index) => (
            <ListItem key={index} divider onClick={() => onClick(item.name)}>
               {item.Icon}
               <Typography variant="body1" component="b" sx={{ color: theme.myColor.white, pl: 1 }}>
                  {item.label}
               </Typography>
            </ListItem>
         ))}
      </WrapFeatures>
   );
};

export default Features;
