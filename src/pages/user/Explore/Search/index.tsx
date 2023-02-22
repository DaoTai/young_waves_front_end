import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BaseInput as MySearch } from "../../../../components";
import { TYPE_SEARCH } from "../../../../utils/types";
import { getAllUser } from "../../../../redux-saga/redux/actions";
const Search = ({ type = "users" }: { type?: TYPE_SEARCH }) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [search, setSearch] = useState<string>("");

   const handleSearch = () => {
      if (search.trim()) {
         if (type === "users") {
            dispatch(
               getAllUser({
                  name: search.trim(),
               })
            );
         }
      }
   };

   const handleClear = () => {
      if (search.trim()) {
         setSearch("");
         if (type === "users") {
            dispatch(getAllUser());
         }
      }
   };

   const onChange = (e) => {
      const value = e.target.value;
      value.trim() ? setSearch(value) : handleClear();
   };

   const onKeyDown = (e: React.KeyboardEvent) => {
      e.which === 13 && search.trim() && handleSearch();
   };

   return (
      <MySearch
         fullWidth
         value={search}
         spellCheck={false}
         placeholder="Search..."
         sx={{
            border: 1,
            borderColor: theme.myColor.textSecondary,
            borderRadius: 12,
            p: 0.5,
            pl: 2,
         }}
         endAdornment={
            <Stack flexDirection="row" alignItems="center">
               <InputAdornment
                  position="end"
                  sx={{
                     mr: 1,
                     p: 2,
                     borderRight: 1,
                     color: theme.myColor.text,
                     cursor: "pointer",
                     "&:hover": {
                        color: theme.palette.primary.main,
                     },
                  }}
                  onClick={handleClear}>
                  <CloseIcon />
               </InputAdornment>
               <InputAdornment
                  position="end"
                  sx={{
                     p: 2,
                     pt: 2.5,
                     pb: 2.5,
                     height: "100%",
                     mr: 1,
                     bgcolor: theme.palette.primary.main,
                     border: 1,
                     borderRadius: 2,
                     cursor: "pointer",
                     color: theme.myColor.white,
                     "&:hover": {
                        opacity: [0.9, 0.8, 0.7],
                     },
                  }}
                  onClick={handleSearch}>
                  <SearchIcon />
               </InputAdornment>
            </Stack>
         }
         onChange={onChange}
         onKeyDown={onKeyDown}
      />
   );
};

export default Search;
