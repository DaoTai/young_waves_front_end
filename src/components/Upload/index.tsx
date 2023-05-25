import React, { ChangeEvent, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import { Box, Button, Stack } from "@mui/material";
const Upload = () => {
   const [attachments, setAttachments] = useState<string[]>([]);
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files as FileList;

      setAttachments(() => {
         return Array.from(files).map((item) => URL.createObjectURL(item));
      });

      Array.from(files).forEach((file) => {
         const imageRef = firebase.storage().ref().child(`images/${file.name}`);

         // Upload file to Firebase Cloud Storage
         imageRef
            .put(file)
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then((url) => {
               console.log("url: ", url);
            });
      });
   };

   useEffect(() => {
      return () => {
         if (attachments.length > 0) {
            attachments.map((item) => URL.revokeObjectURL(item));
         }
      };
   }, [attachments]);

   return (
      <Box>
         <Button>
            <input multiple type="file" onChange={onChange} />
         </Button>

         <Stack flexDirection="row">
            {attachments.map((item, i) => (
               <img key={i} width={50} height={50} src={item} alt="" />
            ))}
         </Stack>
      </Box>
   );
};

export default Upload;
