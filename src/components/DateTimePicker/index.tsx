import {
   InputLabel,
   Select,
   MenuItem,
   Stack,
   Autocomplete,
   TextField,
   Box,
   Typography,
   SelectChangeEvent,
   AutocompleteInputChangeReason,
} from "@mui/material";
import { useState, useEffect, useMemo, memo } from "react";
import dateFormat from "dateformat";
import { Dob } from "../../utils/interfaces/DateTimePicker";
import { MyFormControl } from "./styles";
const DateTimePicker = ({
   onChange = () => {},
   name = "",
   value = String(new Date()),
}: {
   name?: string;
   value?: string;
   onChange?: (...args) => void;
}) => {
   console.log();
   const [dob, setDob] = useState<Dob>(() => {
      const convertedValue = dateFormat(value, "m d yyyy").split(" ") as Array<string>;
      const formatValue = {
         date: convertedValue[0],
         month: convertedValue[1],
         year: convertedValue[2],
      };
      return formatValue;
   });

   const listDate = useMemo(() => {
      try {
         switch (+dob.month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
               return [...Array(31).keys()].map((i) => String(i + 1));
            case 4:
            case 6:
            case 9:
            case 11:
               return [...Array(30).keys()].map((i) => String(i + 1));
            case 2:
               if (dob.year && +dob.year % 4 == 0) {
                  return [...Array(29).keys()].map((i) => String(i + 1));
               } else {
                  return [...Array(28).keys()].map((i) => String(i + 1));
               }
            default:
               throw new Error("Invalid value");
         }
      } catch (err) {
         console.log("Error: ", err);
      }
   }, [dob.month, dob.year]);

   const months = useMemo(() => {
      let listMonth: number[] = [];
      for (let i = 1; i < 13; i++) {
         listMonth.push(i);
      }
      return listMonth;
   }, []);
   const years = useMemo(() => {
      let listYears: string[] = [];
      for (let i = 1950; i <= new Date().getFullYear(); i++) {
         listYears.push(String(i));
      }
      return listYears;
   }, []);
   // Handle get value
   const handleChange = (e: SelectChangeEvent) => {
      setDob((prev: Dob) => {
         const key = e.target.name as keyof Dob;
         return {
            ...prev,
            [key]: String(e.target.value),
         };
      });
   };
   useEffect(() => {
      const formatDob = dob.date + "-" + dob.month + "-" + dob.year;
      onChange(name, formatDob);
   }, [dob]);

   return (
      <Box>
         <Typography variant="subtitle1" mb={1} sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
            Birthday
         </Typography>
         <Stack direction="row" justifyContent="space-between" sx={{ gap: 1 }}>
            {/* Dates */}
            <MyFormControl fullWidth>
               <InputLabel>Date</InputLabel>
               <Select label="Date" name="date" value={dob?.date} onChange={handleChange}>
                  {listDate?.map((date: string) => (
                     <MenuItem key={date} value={date}>
                        {date}
                     </MenuItem>
                  ))}
               </Select>
            </MyFormControl>
            {/* Months */}
            <MyFormControl fullWidth>
               <InputLabel>Month</InputLabel>
               <Select label="Month" name="month" value={dob?.month} onChange={handleChange}>
                  {months.map((month) => (
                     <MenuItem key={month} value={month}>
                        {month}
                     </MenuItem>
                  ))}
               </Select>
            </MyFormControl>
            {/* Years */}
            <Autocomplete
               sx={{ backgroundColor: "#fff" }}
               disablePortal
               openOnFocus
               filterSelectedOptions
               fullWidth
               defaultValue={String(new Date().getFullYear())}
               options={years}
               value={dob?.year}
               onBlur={() => {
                  !!dob?.year ||
                     setDob((prev) => ({
                        ...prev,
                        year: String(new Date().getFullYear()),
                     }));
               }}
               onChange={(event, newValue: string | null) => {
                  setDob((prev) => ({
                     ...prev,
                     year: newValue,
                  }));
               }}
               renderInput={(params) => <TextField {...params} label="Year" />}
            />
         </Stack>
      </Box>
   );
};

export default memo(DateTimePicker);
