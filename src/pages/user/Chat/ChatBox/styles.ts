import { Avatar, Box, Stack, styled } from "@mui/material";

export const MyChatBox = styled(Stack)(({ theme }) => ({
   position: "relative",
   zIndex: 10,
   width: "330px",
   height: "460px",
   paddingTop: 50,
   boxShadow: theme.shadows[2],
   border: "1px solid #ccc",
   backgroundColor: theme.myColor.white,
   overflow: "hidden",
}));

export const Heading = styled(Stack)(({ theme }) => ({
   position: "absolute",
   zIndex: 10,
   top: 0,
   left: 0,
   right: 0,
   padding: 4,
   height: 50,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   color: theme.myColor.text,
   borderBottom: "1px solid #ccc",
   boxShadow: theme.shadows[1],
   backgroundColor: theme.myColor.white,
   ".MuiListItem-root": {
      cursor: "pointer",
      borderRaidus: 4,
      "&:hover": {
         opacity: 0.8,
         backgroundColor: theme.myColor.bg,
         color: theme.palette.primary.main,
      },
   },
}));

export const WrapperChat = styled(Box)(({ theme }) => ({
   position: "relative",
   height: "100%",
   display: "flex",
   padding: "0 4px 2px",
   flexDirection: "column",
   justifyContent: "space-between",
   backgroundColor: theme.myColor.white,
   boxShadow: theme.shadows[1],
}));

export const Body = styled(Box)(({ theme }) => ({
   flex: 2,
   paddingTop: 8,
   paddingBottom: 8,
   height: "60%",
   backgroundColor: theme.myColor.white,
   overflowX: "hidden",
   ".wrap-message": {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      padding: 4,
   },
   ".infinite-scroll-component__outerdiv": { height: "100%" },
   ".wrap-content": {
      maxWidth: "90%",
      position: "relative",
      ".more-icon": {
         display: "none",
         position: "absolute",
         top: "50%",
         left: 0,
         transform: "translate(-100%, -50%)",
         cursor: "pointer",
         "&:hover": {
            filter: "contrast(200%)",
         },
      },
      ".avatar": {
         width: 35,
         height: 35,
      },
      ".message": {
         color: theme.myColor.white,
         whiteSpace: "pre-wrap",
         wordBreak: "break-word",
         padding: "6px 8px",
         borderRadius: 12,
         width: "fit-content",
         marginLeft: "auto",
         background: theme.myColor.bgGradient,
         "&[href^='http']": {
            textDecoration: "underline",
         },
         "&.message--friend": {
            marginLeft: 0,
            marginRight: "auto",
            background: theme.myColor.link,
            position: "relative",
            "&::before": {
               content: '""',
               position: "absolute",
               top: "50%",
               left: -8,
               borderWidth: 4,
               borderStyle: " solid",
               borderColor: `transparent ${theme.myColor.link}  transparent transparent`,
               transform: "translate(0, -50%)",
            },
         },
      },

      img: {
         objectFit: "cover",
         borderRadius: 4,
         width: "100%",
         height: "100%",
         maxHeight: "200px",
         cursor: "pointer",
         transition: "all 0.3s ease",
      },

      "&:hover": {
         ".more-icon": {
            display: "block",
         },
      },
   },
}));

export const Footer = styled(Stack)(({ theme }) => ({
   minHeight: 54,
   maxHeight: "40%",
   gap: 8,
   padding: 4,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "flex-end",
   color: theme.myColor.text,
   backgroundColor: theme.myColor.white,
   borderTop: "1px solid transparent",
   position: "relative",
   zIndex: 10,
   "&:hover, &:focus-within": {
      borderColor: theme.myColor.link,
   },
   "#form-chat": {
      resize: "none",
      fontSize: 14,
      padding: "4px 8px",
      borderRadius: 4,
      fontFamily: "inherit",
      flex: "1 1 auto",
      border: "none",
      outline: "none",
      caretColor: theme.myColor.link,
      height: "50% !important",
      width: "100%",
      backgroundColor: theme.myColor.bgGray,
      overflow: "scroll !important",
      transition: "all 0.2s ease",
      "&::placeholder": {
         letterSpacing: 1,
      },
      "::-webkit-scrollbar": {
         display: "none",
      },
      "&:hover, &:focus": {
         outlineColor: theme.myColor.link,
      },
   },
   "#send-btn": {
      backgroundColor: theme.myColor.white,
      borderRadius: 4,
      width: 42,
      height: 42,
      padding: 8,
      border: "1px solid transparent",
      cursor: "pointer",
      boxShadow: theme.shadows[2],
      transition: "all 0.3s linear",
      "&:hover": {
         opacity: 0.8,
         borderColor: theme.myColor.link,
      },
   },
}));

export const WrapAttachments = styled(Stack)(({ theme }) => ({
   flexDirection: "row",
   flexWrap: "nowrap",
   overflow: "auto",
   gap: 4,
   padding: "4px 8px 4px 0",
   img: {
      width: 75,
      height: 75,
      borderRadius: 8,
      objectFit: "cover",
   },
}));

export const Floating = styled(Avatar)(({ theme }) => ({
   position: "relative",
   padding: 2,
   zIndex: 99999,
   width: 56,
   height: 56,
   borderRadius: "50%",
   cursor: "pointer",
   boxShadow: "1px 0px 4px rgba(0,0,0,0.2)",
   img: {
      borderRadius: "50%",
   },
   "&:hover": {
      opacity: 0.8,
   },
}));
