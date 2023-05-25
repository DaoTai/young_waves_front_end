import { Box, Tooltip } from "@mui/material";
import { ChangeEvent, memo, useEffect, useRef } from "react";
import firebase from "../../firebase/config";
import { WrapFileInput } from "./styles";

interface Props {
   multiple?: boolean;
   onChange: (file: FileList) => void;
   width?: number;
   height?: number;
}

const ImageInput = ({ multiple = false, onChange, width = 50, height = 50 }: Props) => {
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      files && onChange(files);
   };

   return (
      <Box className="image-input">
         <Tooltip title="Add images" arrow placement="top" sx={{ display: "flex" }}>
            <WrapFileInput sx={{ width: width, height: height }}>
               <input
                  multiple={multiple}
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={handleChange}
               />
            </WrapFileInput>
         </Tooltip>
      </Box>
   );
};

export default memo(ImageInput);
