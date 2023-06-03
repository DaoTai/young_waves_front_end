import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { memo, useEffect, useId, useRef, useState } from "react";
interface Country {
   name: string;
   image?: string;
}

interface Props {
   name: string;
   value?: string;
   onlyOptions?: boolean;
   onChange: (...args) => void;
   onBlur: (...args) => void;
}

const CountriesSelect = ({ name, value = "", onChange, onBlur, onlyOptions = false }: Props) => {
   const [countries, setCountries] = useState<Country[] | []>([]);
   const [selectedValue, setNewValue] = useState<Country | null>(null);
   const id = useId();

   useEffect(() => {
      (async () => {
         try {
            const res = await axios.get("https://restcountries.com/v3.1/all");
            const fetchedData = res.data.map((item) => {
               return {
                  name: item.name.common,
                  image: item.flags.png,
               };
            }) as Country[];
            if (onlyOptions) {
               setCountries(fetchedData);
            } else {
               if (value) {
                  setCountries(() => {
                     const isExistedValue = fetchedData.some((country) => country.name === value);
                     return isExistedValue ? fetchedData : [{ name: value }, ...fetchedData];
                  });
                  setNewValue({ name: value });
               }
            }
         } catch (err) {
            console.error(err);
         }
      })();
   }, [value]);

   const handleChange = (e, newValue) => {
      onChange(name, newValue?.name);
      setNewValue(newValue);
   };

   return (
      <>
         <Autocomplete
            fullWidth
            value={selectedValue}
            options={countries}
            onChange={handleChange}
            onBlur={onBlur}
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(option, value) => option?.name === value?.name}
            renderOption={(props, option) => (
               <Box key={id} component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                  {option?.image && (
                     <img width="20" src={option.image} srcSet={`${option.image}`} alt="country" />
                  )}
                  {option.name}
               </Box>
            )}
            renderInput={(params) => <TextField {...params} placeholder="--Select country--" />}
         />
      </>
   );
};

export default memo(CountriesSelect);
