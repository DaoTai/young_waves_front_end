import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, useTheme } from "@mui/material";
import React from "react";
import MySearch from "../../BaseInput";
const Search = () => {
   const theme = useTheme();
   return (
      <MySearch
         sx={{
            border: 1,
            borderColor: theme.myColor.textSecondary,
            borderRadius: 5,
            pl: 1,
            pr: 1,
         }}
         placeholder="Search..."
         endAdornment={
            <InputAdornment position="end">
               <SearchIcon />
            </InputAdornment>
         }
      />
   );
};

export default Search;
