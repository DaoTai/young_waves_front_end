import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Fab, Modal, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getDetailTrashPost } from "../../../../../apis/post";
import { CloseButton } from "../../../../../components";
import MyComment from "../../../../../components/Comment";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { Post } from "../../../../../utils/interfaces/Post";
import { ButtonSlide, MyBox } from "../../../NewsFeed/News/Detail/styles";
import Heading from "../../../NewsFeed/News/Heading";
import { settings } from "./config";
interface DetailPost {
   comments: [] | Comment[];
   post: Post;
}
const Detail = () => {
   const theme = useTheme();
   const { id } = useParams();
   const navigate = useNavigate();
   const [open, setOpen] = useState(true);
   const [trashPost, setTrashPost] = useState<DetailPost | null>(null);
   const sliderRef = useRef<Slider | null>(null);
   useEffect(() => {
      (async () => {
         if (id) {
            try {
               const res = await getDetailTrashPost(id);
               setTrashPost(res.data);
            } catch (err: any) {
               throw new Error(err);
            }
         }
      })();
   }, [id]);
   const handleClose = () => {
      setOpen(false);
      navigate(-1);
   };

   return (
      <>
         <Modal open={open} onClose={handleClose}>
            <MyBox>
               <Box bgcolor={theme.palette.white.main} boxShadow={1} position="sticky" sx={{ top: 0, right: 0, left: 0, zIndex: 999, height: 70 }} p={2}>
                  <CloseButton onClick={handleClose} size="large" />
                  <Typography variant="h4" textAlign="center" sx={{ color: theme.palette.text.primary }} fontWeight={600}>
                     Trash post
                  </Typography>
               </Box>
               <Box>
                  {/* Images */}
                  {trashPost?.post.attachments.length ? (
                     <Box position="relative" height="100%" bgcolor={theme.palette.black.main} overflow="hidden">
                        <Slider ref={sliderRef} {...settings}>
                           {trashPost?.post.attachments.map((img, index) => (
                              <div key={index}>
                                 <img
                                    src={img}
                                    style={{
                                       height: "60vh",
                                       width: "100%",
                                       objectFit: "contain",
                                    }}
                                 />
                              </div>
                           ))}
                        </Slider>
                        {trashPost?.post.attachments?.length > 1 && (
                           <ButtonSlide>
                              <Fab
                                 sx={{
                                    color: theme.palette.secondary.main,
                                    backgroundColor: theme.palette.white.main,
                                 }}
                                 size="medium"
                                 onClick={() => sliderRef.current?.slickPrev()}>
                                 <ArrowBackIosIcon />
                              </Fab>
                              <Fab
                                 sx={{
                                    color: theme.palette.secondary.main,
                                    backgroundColor: theme.palette.white.main,
                                 }}
                                 size="medium"
                                 onClick={() => sliderRef.current?.slickNext()}>
                                 <ArrowForwardIosIcon />
                              </Fab>
                           </ButtonSlide>
                        )}
                     </Box>
                  ) : null}

                  {/* Content */}
                  <Stack
                     flexDirection="column"
                     p={2}
                     pt={0}
                     gap={2}
                     sx={{
                        background: theme.palette.white.main,
                        border: "none",
                     }}>
                     <Box>
                        <Heading post={trashPost?.post as Post} />
                        <Typography variant="body1" textAlign="justify" borderBottom={1} lineHeight={2}>
                           {trashPost?.post?.body}
                        </Typography>
                     </Box>
                     {/* List comment */}
                     <Box sx={{ scrollY: "auto" }}>
                        {trashPost?.comments && trashPost?.comments.length > 0 ? (
                           trashPost?.comments?.map((comment: Comment) => {
                              return <MyComment key={comment._id} comment={comment} enableActions />;
                           })
                        ) : (
                           <Typography variant="body1" textAlign="center">
                              No comment
                           </Typography>
                        )}
                     </Box>
                  </Stack>
               </Box>
            </MyBox>
         </Modal>
         {/* <Spinner show={isLoading} /> */}
      </>
   );
};

export default Detail;
