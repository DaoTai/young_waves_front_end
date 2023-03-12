import {
   Stack,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   Typography,
} from "@mui/material";
import { useState } from "react";
import Form from "../../auth/SignUp/Form";
const AddMember = () => {
   const [role, setRole] = useState<string>("User");
   // handle change role
   const handleChangeRole = (event: SelectChangeEvent) => {
      setRole(event.target.value as string);
   };
   return (
      <>
         <Typography variant="h3" textAlign="center" letterSpacing={2}>
            Add member
         </Typography>
         <Stack justifyContent="flex-end">
            <FormControl sx={{ width: 200, pb: 2, pt: 2, ml: "auto" }}>
               <InputLabel>Role</InputLabel>
               <Select value={role} label="Selection" onChange={handleChangeRole}>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
               </Select>
            </FormControl>
         </Stack>
         <Form isAdmin={role === "Admin"} />
      </>
   );
};

export default AddMember;
