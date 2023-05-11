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
   height: "80%",
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
         borderRadius: 12,
         width: "100%",
         height: "100%",
         maxHeight: "200px",
         cursor: "pointer",
         transition: "all 0.3s ease",
         "&:hover": {
            filter: "contrast(110%)",
         },
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
   maxHeight: "20%",
   gap: 8,
   flexDirection: "row",
   justifyContent: "space-between",
   color: theme.myColor.text,
   backgroundColor: theme.myColor.white,
   "#form-chat": {
      resize: "none",
      padding: 4,
      borderRadius: 4,
      fontFamily: "inherit",
      fontSize: "inherit",
      flexGrow: 2,
      border: `1px solid ${theme.myColor.link}`,
      height: "54px !important",
      width: "100%",
      overflow: "scroll !important",
      transition: "all 0.2s ease",
      "&:hover, &:focus": {
         outlineColor: theme.myColor.link,
      },
   },
   "#send-icon": {
      alignSelf: "center",
      color: theme.palette.primary.main,
      borderRadius: 12,
      width: 42,
      height: 42,
      padding: 8,
      cursor: "pointer",
      boxShadow: theme.shadows[2],
      transition: "all 0.3s linear",
      "&:hover": {
         opacity: 0.8,
         backgroundColor: theme.myColor.link,
         color: theme.myColor.white,
      },
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
