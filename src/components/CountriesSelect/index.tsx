import { useState, useEffect, memo, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Typography } from "@mui/material";
interface Country {
   name: string;
   image?: string;
}

interface Props {
   name: string;
   value?: string;
   onChange: (...args) => void;
   error?: boolean;
   helperText?: string | null | undefined;
   onBlur: (...args) => void;
}

const CountriesSelect = ({ name, value = "", onChange, error, helperText, onBlur }: Props) => {
   const [countries, setCountries] = useState<Country[] | []>([
      {
         name: value,
      },
   ]);
   const [valueInput, setValue] = useState<any>(value);
   const InputRef = useRef();

   useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
         .then((res) => res.json())
         .then((data) => {
            const newData = data.map((item) => {
               return {
                  name: item.name.common,
                  image: item.flags.png,
               };
            });
            setCountries((prev) => {
               return [...prev, ...newData];
            });
         })
         .catch((err) => console.error(err));
   }, []);

   const handleChange = (e, newValue) => {
      onChange(name, newValue?.name);
   };
   const onInputChange = (e, newInputValue) => {
      setValue(newInputValue);
   };
   return (
      <>
         <Autocomplete
            value={{ name: value } || null}
            options={countries}
            onChange={handleChange}
            onInputChange={onInputChange}
            onBlur={onBlur}
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(option, value) => option?.name === value?.name}
            renderOption={(props, option) => (
               <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                  {option?.image && (
                     <img
                        loading="lazy"
                        width="20"
                        src={option.image}
                        srcSet={`${option.image}`}
                        alt=""
                     />
                  )}
                  {option.name}
               </Box>
            )}
            renderInput={(params) => <TextField {...params} />}
         />
      </>
   );
};

export default memo(CountriesSelect);
