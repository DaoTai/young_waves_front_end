import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, useTheme } from "@mui/material";
import { useState } from "react";
import MySearch from "../../BaseInput";
const Search = () => {
   const theme = useTheme();
   const [search, setSearch] = useState<string>("");
   console.log("Hi");
   return (
      <MySearch
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         fullWidth
         spellCheck={false}
         sx={{
            border: 1,
            borderColor: theme.myColor.textSecondary,
            borderRadius: 12,
            pl: 2,
            pr: 2,
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
