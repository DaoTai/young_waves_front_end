import {
   Stack,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   Typography,
   Box,
   useTheme,
} from "@mui/material";
import { useState } from "react";
import Form from "../../../auth/SignUp/Form";
import { CloseButton } from "../../../../components";
const AddMember = ({ onClose }: { onClose: () => void }) => {
   const theme = useTheme();
   const [role, setRole] = useState<string>("User");
   // handle change role
   const handleChangeRole = (event: SelectChangeEvent) => {
      setRole(event.target.value as string);
   };
   return (
      <Box
         bgcolor={theme.myColor.white}
         boxShadow={2}
         p={2}
         borderRadius={2}
         width="98vw"
         height="98vh"
         overflow="auto"
         position="absolute"
         top="50%"
         left="50%"
         sx={{ transform: "translate(-50%, -50%)" }}>
         <CloseButton size="large" onClick={onClose} />
         <Typography variant="h3" textAlign="center" letterSpacing={2}>
            Add member
         </Typography>
         <Stack justifyContent="flex-end">
            <FormControl sx={{ minWidth: 200, mb: 1, mt: 2, ml: "auto" }}>
               <InputLabel>Role</InputLabel>
               <Select value={role} label="Selection" onChange={handleChangeRole}>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
               </Select>
            </FormControl>
         </Stack>
         <Form isAdmin={role === "Admin"} />
      </Box>
   );
};

export default AddMember;
