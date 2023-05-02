import { ImageList, ImageListItem, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OverlayBackground from "../../../../../components/OverlayBackground";

const ListImages = ({ id, attachments }: { id: string; attachments: string[] }) => {
   const columns = 4;
   const navigate = useNavigate();
   const handleNavigate = () => {
      if (window.location.pathname.includes("/user/profile")) {
         navigate(`/user/news/${id}`);
      } else {
         navigate(`/news/${id}`);
      }
   };

   return (
      <>
         <ImageList
            variant="quilted"
            cols={columns}
            sx={{
               mt: 0,
               borderBottom: 1,
               pt: 1,
               pb: 1,
               img: {
                  maxHeight: "50vh",
                  minWidth: "120px",
                  borderRadius: 2,
                  cursor: "pointer",
                  boxShadow: 1,
                  transition: "all 0.3s linear",
                  "&:hover": {
                     filter: "drop-shadow(2px 4px 6px #ccc) contrast(1.1)",
                  },
               },
            }}>
            {attachments?.map((item, index, arr) => {
               if (index < columns) {
                  return index === columns - 1 ? (
                     <ImageListItem key={index} onClick={handleNavigate}>
                        <img src={item} srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                        <OverlayBackground amount={arr.length - columns} />
                     </ImageListItem>
                  ) : (
                     <ImageListItem key={index} onClick={handleNavigate}>
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
