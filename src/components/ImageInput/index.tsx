import { Tooltip } from "@mui/material";
import { memo } from "react";
import FileBase64 from "react-file-base64";
import { WrapFileInput } from "./styles";

const ImageInput = ({
   multiple = false,
   onChange,
}: {
   multiple?: boolean;
   onChange: (e: React.FormEvent<EventTarget>) => void;
}) => {
   const handleGetImages = (files: any) => {
      if (Array.isArray(files)) {
         const fileImages = files.filter((file: any) => !file.type.includes("mp"));
         const fileBases = fileImages.map((file: any) => file.base64);
         onChange(fileBases as any);
      } else {
         if (!files.type.includes("mp")) {
            const fileBases = files.base64;
            onChange(fileBases);
         }
      }
   };
   return (
      <div className="image-input">
         <Tooltip title="Add images" arrow placement="top" sx={{ display: "block" }}>
            <WrapFileInput>
               <FileBase64
                  multiple={multiple}
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  onDone={handleGetImages}
               />
            </WrapFileInput>
         </Tooltip>
      </div>
   );
};

export default memo(ImageInput);
