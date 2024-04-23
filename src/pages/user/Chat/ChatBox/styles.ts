import { Avatar, Box, Grid, Stack, styled } from "@mui/material";

export const MyChatBox = styled(Stack)(({ theme }) => ({
  position: "relative",
  zIndex: 10,
  width: "330px",
  height: "60vh",
  paddingTop: 50,
  borderRadius: 4,
  boxShadow: theme.shadows[2],
  border: "1px solid #ccc",
  backgroundColor: theme.palette.white.main,
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
  color: theme.palette.text.primary,
  borderBottom: "1px solid #ccc",
  backgroundColor: theme.palette.white.main,
  ".MuiListItem-root": {
    cursor: "pointer",
    borderRaidus: 4,
    "&:hover": {
      opacity: 0.8,
      backgroundColor: theme.palette.background.default,
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
  backgroundColor: theme.palette.white.main,
  boxShadow: theme.shadows[1],
}));

export const Body = styled(Box)(({ theme }) => ({
  flex: 2,
  paddingTop: 8,
  paddingBottom: 8,
  height: "60%",
  backgroundColor: theme.palette.white.main,
  overflowX: "hidden",
  ".wrap-message": {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
      color: "#fff",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      padding: "8px",
      borderRadius: 16,
      width: "fit-content",
      marginLeft: "auto",
      background: theme.palette.gradient.main,
      a: {
        textDecoration: "underline",
        color: "inherit",
      },
      img: {
        marginTop: 12,
        width: "100%",
        height: "30%",
        objectFit: "cover",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      },
      "&.message--friend": {
        marginLeft: 0,
        marginRight: "auto",
        background: theme.palette.link.main,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: -7,
          borderWidth: 4,
          borderStyle: " solid",
          borderColor: `transparent ${theme.palette.link.main}  transparent transparent`,
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
  alignItems: "flex-end",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.white.main,
  borderWidth: "1px 0 0 0",
  borderStyle: "solid",
  borderColor: theme.palette.link.main,
  position: "relative",
  zIndex: 10,
  "#form-chat": {
    maxHeight: 100,
    fontSize: 14,
    color: theme.palette.text.primary,
    fontFamily: "inherit",
    caretColor: theme.palette.link.main,
    overflow: "scroll !important",
    transition: "all 0.2s ease",
    "&::placeholder": {
      letterSpacing: 1,
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
    "&:hover, &:focus": {
      outlineColor: theme.palette.link.main,
    },
  },
  "#send-btn": {
    backgroundColor: theme.palette.white.main,
    width: 42,
    height: 42,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    cursor: "pointer",
    boxShadow: theme.shadows[2],
    transition: "all 0.3s linear",
    "&:hover": {
      opacity: 0.8,
    },
  },
}));

export const WrapAttachments = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "nowrap",
  overflow: "auto",
  gap: 4,
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
