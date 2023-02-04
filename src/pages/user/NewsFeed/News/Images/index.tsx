import { useRef, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import OverlayBackground from "../../../../../components/OverlayBackground";
import Detail from "../Detail";
import { DetailRef } from "../Detail/interface";
const images = [
   "https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414",
   "https://mensfolio.vn/wp-content/uploads/2021/11/Rhymatic-B-Wine-682x1024.jpg",
   "https://www.latercera.com/resizer/rzPbQPeXBL00TjgMEcWH3ykEeBM=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/PKPRW73SMRH6FKOCKEA3HOH5UE.jpg",
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2raKsA12VHSONYOWgl0XtdWzGnUmTU-6KkrZhILBznfFEIVcyUb7FlMsxlERumHz779M&usqp=CAU",
   "https://media.travelmag.vn/files/content/2021/11/22/rhymastic--16-brt-09363192.jpg",
   "https://mensfolio.vn/wp-content/uploads/2021/11/Rhymastic-VSoul.jpg",
   "https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414",
];
const ListImages = () => {
   const columns = 5;
   const detailRef = useRef<DetailRef>(null);
   const [indexImage, setIndexImage] = useState(0);
   const handleClickImage = (index: number) => {
      setIndexImage(index as number);
      detailRef.current?.handleOpen();
   };
   return (
      <>
         <ImageList variant="quilted" cols={columns} gap={8}>
            {images?.map((item, index, arr) => {
               if (index < columns) {
                  return index === columns - 1 ? (
                     <ImageListItem key={index} onClick={() => handleClickImage(index)}>
                        <img srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                        <OverlayBackground amount={arr.length - columns} />
                     </ImageListItem>
                  ) : (
                     <ImageListItem key={index} onClick={() => handleClickImage(index)}>
                        <img srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                     </ImageListItem>
                  );
               }
            })}
         </ImageList>

         <Detail ref={detailRef} indexImage={indexImage} />
      </>
   );
};

export default ListImages;
