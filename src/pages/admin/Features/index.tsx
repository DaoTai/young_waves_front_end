import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import { Fab, Stack, useTheme } from "@mui/material";
import { FEATURES_ADMIN } from "../../../utils/enums";
import { TYPE_FEATURES } from "../../../utils/types";
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
            background: theme.palette.gradient.main,
         }}
         boxShadow={2}>
         {items.map((item, index) => (
            <Fab
               key={index}
               size="medium"
               onClick={() => onClick(item.name)}
               sx={{
                  bgcolor: theme.palette.link.main,
                  color: theme.palette.white.main,
                  border: 1,
                  transition: "all 0.3s linear",
                  "&:hover": {
                     color: theme.palette.link.main,
                     bgcolor: theme.palette.white.main,
                     borderColor: theme.palette.link.main,
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
