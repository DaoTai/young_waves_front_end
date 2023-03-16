import { ImageList, ImageListItem, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OverlayBackground from "../../../../../components/OverlayBackground";

const ListImages = ({ id, attachments }: { id: string; attachments: string[] }) => {
   const columns = 4;
   const navigate = useNavigate();
   const handleNavigate = (index: number) => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${id}/${index}`);
      } else {
         navigate(`/news/${id}/${index}`);
      }
   };

   return (
      <>
         <ImageList
            sx={{ mt: 0, minHeight: "35vh", borderBottom: 1, pt: 1, pb: 1 }}
            variant="standard"
            cols={columns}
            gap={8}>
            {attachments?.map((item, index, arr) => {
               if (index < columns) {
                  return index === columns - 1 ? (
                     <ImageListItem
                        key={index}
                        sx={{
                           img: {
                              borderRadius: 4,
                              cursor: "pointer",
                              boxShadow: 1,
                           },
                        }}
                        onClick={() => handleNavigate(index)}>
                        <img src={item} srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                        <OverlayBackground amount={arr.length - columns} />
                     </ImageListItem>
                  ) : (
                     <ImageListItem
                        key={index}
                        sx={{
                           img: {
                              borderRadius: 4,
                              cursor: "pointer",
                              boxShadow: 1,
                           },
                        }}
                        onClick={() => handleNavigate(index)}>
                        <img srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                     </ImageListItem>
                  );
               }
            })}
         </ImageList>
      </>
   );
};

export default ListImages;
