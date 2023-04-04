import { Box, Grid, Modal, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";

import { CloseButton, PostBody } from "../../../../../components";
// import { postState$ } from "../../../../../redux-saga/redux/selectors";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Container, MyBox } from "../../../NewsFeed/News/Detail/styles";
const Detail = () => {
   const theme = useTheme();
   // const { isLoading, payload } = useSelector(postState$);
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // const { post, comments } = (payload as { post: Post; comments: Comment[] }) ?? {};
   const [open, setOpen] = useState(true);
   const sliderRef = useRef<Slider | null>(null);
   useEffect(() => {
      // id && dispatch(getTrashPost(id as string));
   }, []);
   const handleClose = () => {
      setOpen(false);
      navigate(-1);
   };

   return (
      <>
         <Modal open={open} onClose={handleClose}>
            <MyBox>
               <Typography
                  variant="h3"
                  textAlign="center"
                  p={2}
                  borderBottom={1}
                  sx={{ backgroundColor: theme.myColor.white }}>
                  {/* Post of {post?.author?.fullName} */}
               </Typography>
               <CloseButton onClick={handleClose} size="large" />
               <Container container>
                  {/* Images */}
                  {/* {post?.attachments?.length ? (
                     <Grid item md={8} xs={12} position="relative" height="100%" overflow="hidden">
                        <Slider ref={sliderRef} {...settings}>
                           {post?.attachments.map((img, index) => (
                              <div key={index}>
                                 <img
                                    src={img}
                                    style={{
                                       maxHeight: "80vh",
                                       width: "100%",
                                       objectFit: "contain",
                                    }}
                                 />
                              </div>
                           ))}
                        </Slider>
                        <ButtonSlide>
                           <Fab
                              sx={{
                                 color: theme.myColor.textSecondary,
                                 backgroundColor: theme.myColor.white,
                              }}
                              size="medium"
                              onClick={() => sliderRef.current?.slickPrev()}>
                              <ArrowBackIosIcon />
                           </Fab>
                           <Fab
                              sx={{
                                 color: theme.myColor.textSecondary,
                                 backgroundColor: theme.myColor.white,
                              }}
                              size="medium"
                              onClick={() => sliderRef.current?.slickNext()}>
                              <ArrowForwardIosIcon />
                           </Fab>
                        </ButtonSlide>
                     </Grid>
                  ) : null} */}

                  {/* Content */}
                  <Grid
                     item
                     // md={post?.attachments?.length > 0 ? 4 : 12}
                     xs={12}
                     pl={2}
                     pr={2}
                     boxShadow={1}
                     sx={{
                        maxHeight: "80vh",
                        background: theme.myColor.white,
                        overflowY: "scroll",
                     }}>
                     <Box m={1} pb={1}>
                        <PostBody bt={1} backgroundColor={theme.myColor.white}>
                           {/* {post?.body} */}
                        </PostBody>
                     </Box>
                     {/* List comments */}
                     {/* <Box mt={2}>
                        {comments?.length > 0 ? (
                           comments?.map((comment: Comment, index) => {
                              return <MyComment key={index} comment={comment} />;
                           })
                        ) : (
                           <Typography textAlign="center">No comment</Typography>
                        )}
                     </Box> */}
                  </Grid>
               </Container>
            </MyBox>
         </Modal>
         {/* <Spinner show={isLoading} /> */}
      </>
   );
};

export default Detail;
