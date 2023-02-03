import { Box, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef } from "react";
import FileBase64 from "react-file-base64";
import { Stack } from "@mui/system";
import { MyLabel, WrapFileInput } from "./styles";

const ImageInput = ({ onChange }: { onChange: (e: React.FormEvent<EventTarget>) => void }) => {
   const handleGetImages = (files: any) => {
      const fileImages = files.filter((file: any) => !file.type.includes("video"));
      const fileBases = fileImages.map((file: any) => file.base64);
      onChange(fileBases);
   };
   return (
      <div>
         <Tooltip title="Add images" arrow placement="top">
            <WrapFileInput>
               <FileBase64
                  multiple
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  onDone={handleGetImages}
               />
            </WrapFileInput>
         </Tooltip>
      </div>
   );
};

export default ImageInput;